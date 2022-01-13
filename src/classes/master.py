from tkinter import Tk
from tkinter.ttk import Label, Button, Entry, LabelFrame, Scrollbar
from classes.helper import Helper

class Master:
    def __init__(self, root: Tk):
        self.root = root
        self.x = self.root.winfo_width()

        self.button_y = 73
        self.frame_y = self.root.winfo_screenheight() - 750
        self.views = []

        self.root.focus_set()

        self.text = Label(self.root, text="Hello World!")
        self.text.place(anchor="n", y=25, x=self.x / 2)

        self.input_entry = Entry(self.root)
        self.input_entry.place(anchor="n", y=50, x=self.x / 2)

        # make when the user presses enter, the create method is called.
        self.input_entry.bind("<Return>", self.create)

        # make user type as soon as the window opens.
        self.input_entry.focus_set()

        self.create_button = Button(self.root, text="Create", command=self.create)
        self.create_button.place(anchor="n", x=self.x / 2, y=self.button_y)

        self.delete_button = Button(self.root, text="Delete", command=self.delete)
        self.delete_button.place(anchor="n", x=(self.x / 2) + 80, y=self.button_y)

        self.open_button = Button(self.root, text="Open")
        self.open_button.place(anchor="n", x=(self.x / 2) - 80, y=self.button_y)

        # create a frame to hold a list of the files and place it under the buttons
        self.list_frame = LabelFrame(self.root, text="List of Notepads")
        self.list_frame.place(x=145, y=self.frame_y, anchor="w")

        # Can't get scrollbar to work.

        # create a scrollbar to scroll through the list of files
        self.scrollbar = Scrollbar(self.list_frame, orient="vertical")
        self.scrollbar.grid(row=0, column=1, sticky="w")

    def create(self, *_):
        name = self.input_entry.get()
        if name == "":
            Helper.show_error("Please enter a name.")
            return
        self.input_entry.delete(0, "end")

        if not Helper.add_notepad(name):
            Helper.show_error("That notepad already exists.")
            return

        self.add_view(name)

    def delete(self, *_):
        name = self.input_entry.get() + ".txt"

        self.input_entry.delete(0, "end")

        if not Helper.delete_notepad(name):
            Helper.show_error("That notepad does not exist.")
            return

        # self.remove_view(name)

    def add_view(self, name):
        self.views.append(name)
        self.set_views()

    def set_views(self):
        self.list_frame.destroy()
        self.list_frame = LabelFrame(self.root, text="List of Notepads")
        self.list_frame.place(x=145, y=self.frame_y, anchor="w")

        # same thing here
        self.scrollbar = Scrollbar(self.list_frame, orient="vertical")
        self.scrollbar.grid(row=1, column=1, sticky="w")

        for view in self.views:
            row = len(self.views)
            Label(self.list_frame, text=view).grid(row=row, column=0)
