from classes.helper import Helper
from classes.Widgets import Widgets
from os.path import join, getsize
from tkinter import Toplevel, Tk, StringVar
from tkinter.ttk import Button, Label

def encrypt(password):
    import hashlib
    return hashlib.sha256(password.encode()).hexdigest()

def create_label(parent: Toplevel, text: str):
    label = Label(parent, text=text)
    label.pack(side="top", fill="x", pady=10)
    return label

class Password:
    tries = 0

    def __init__(self, root: Tk):
        self.root = root

        self.top = Helper.setup_top(self.root, "Enter Password")
        self.root.eval("tk::PlaceWindow %s center" % self.top)
        self.top.focus_set()

        self.password = self.get_pass()

        self.entry = Widgets.create_entry(self.top, show="*")
        self.entry.pack()
        self.entry.bind("<Return>", self.password_check)

        self.confirm = Widgets.create_button(self.top, text="Confirm", command=self.password_check)
        self.confirm.pack()

        self.entry.focus_set()

    def password_check(self, *_):
        password = self.entry.get()

        if password is None or password == "":
            return

        call = self.get_pass()
        real_pass = call if type(call) == str else call.get()

        if real_pass == encrypt(password):
            self.top.destroy()
            self.root.deiconify()
        else:
            self.entry.delete(0, "end")
            self.entry.focus_set()

            error = Helper.show_error("Wrong password!", self.root)
            error.after(1000, error.destroy)

            self.entry.focus_set()

            self.tries += 1

            if self.tries >= 3:
                error = Helper.show_error("You have entered the wrong password 3 times. Exiting...\n", self.root)
                self.top.after(1500, lambda: self.top.destroy() and self.root.destroy())
                error.after(1500, error.destroy)

    def get_pass(self) -> str | StringVar:
        directory = Helper.get_notepads_directory()

        file = join(directory, "__password__.txt")

        if Helper.file_exists(file):
            with open(file, "r") as pass_file:
                if getsize(file) == 0:
                    return self.enter_pass()
                else:
                    return pass_file.read()
        else:
            return self.enter_pass()

    @staticmethod
    def set_pass(password: str, top: Toplevel):
        directory = Helper.get_notepads_directory()

        file = join(directory, "__password__.txt")

        with open(file, "w") as f:
            f.write(encrypt(password))

        top.destroy()

    def enter_pass(self):
        self.top.withdraw()

        # funni number
        top = Helper.setup_top(self.root, title="Set Password", geometry="420x69")

        self.root.eval("tk::PlaceWindow %s center" % top)

        top_label = Widgets.create_label(top, text="You seem new! Type here the password you want to use for your notepad.")
        top_label.pack()

        var = StringVar()

        top_entry = Widgets.create_entry(top, show="*", textvariable=var)
        top_entry.pack()

        def call_back():
            self.set_pass(top_entry.get(), top)
            self.top.deiconify()

        Widgets.create_button(top, text="Confirm", command=call_back).pack()

        return var
