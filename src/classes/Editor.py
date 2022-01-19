from tkinter import Tk, Frame, Text
from classes.helper import Helper
from classes.Widgets import Widgets

class Editor:
    saved = True

    def __init__(self, name: str, path: str, window: Tk):
        self.window = window

        self.name = name
        self.path = path

        self.root = Helper.setup_top(None, self.name, withdraw=False, geometry="800x600")

        self.main_frame = Frame(self.root)
        self.main_frame.pack()

        self.yscrollbar = Widgets.create_scrollbar(self.main_frame, orient="vertical")
        self.xscrollbar = Widgets.create_scrollbar(self.main_frame, orient="horizontal")

        with open(path, "r") as file:
            self.original_text = file.read()
            if not self.original_text:
                self.original_text = ""

        self.status = Widgets.create_label(self.main_frame, text="STATUS --", font=("Helvetica", 12), anchor="w")
        self.status.pack(side="bottom", fill="x")

        self.text: Text = Widgets.create_text(self.main_frame, font=("Helvetica", 16),
                                              width=800, height=600,
                                              selectbackground="#FFFFF7", selectforeground="black",
                                              insertbackground="white", undo=True,
                                              yscrollcommand=self.yscrollbar.set, xscrollcommand=self.xscrollbar.set,
                                              wrap="word")

        self.text.insert(1.0, self.original_text)

        self.yscrollbar.config(command=self.text.yview)
        self.xscrollbar.config(command=self.text.xview)

        self.yscrollbar.pack(side="right", fill="y")
        self.xscrollbar.pack(side="bottom", fill="x")
        self.text.pack()

        self.root.bind("<Control-s>", lambda *_: Functions.save_file(self))

        self.root.bind("<Control-Q>", lambda *_: Functions.exit_file(self))
        self.root.protocol("WM_DELETE_WINDOW", lambda *_: Functions.exit_file(self))

        Functions.save_file(self)
        set_interval(self.check_changes, 0.65, self.root)

    def check_changes(self):
        before = self.saved
        if self.text.get(1.0, "end") != self.original_text:
            self.saved = False
        else:
            self.saved = True

        if before != self.saved:
            status = f"Saved >> {self.name}" if self.saved else f"Unsaved >> {self.name}"
            self.status.config(text=status)

class Functions:
    @staticmethod
    def save_file(this: Editor, *_):
        new_content = this.text.get(1.0, "end")

        if new_content == this.original_text:
            return

        with open(this.path, "w") as file:
            empty_file(this.path)
            file.write(new_content)

            this.original_text = new_content
            this.saved = True
            this.status.config(text=f"Saved >> {this.name}")

    @staticmethod
    def exit_file(this: Editor):
        if not this.saved:
            Helper.confirmation("Exit", "Are you sure you want to exit without saving?", this.root.destroy, this.window)
        else:
            this.root.destroy()

def empty_file(path: str):
    with open(path, "w") as file:
        file.write("")


def set_interval(func: callable, time, widget):
    def wrapper():
        func()
        widget.after(int(time * 1000), wrapper)

    wrapper()
