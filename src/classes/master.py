from tkinter import Tk
from tkinter.ttk import Label, Button, Entry
from classes.helper import Helper

class Master:
    def __init__(self, root: Tk):
        self.root = root

        self.root.grid_columnconfigure(3, weight=1)
        self.root.grid_rowconfigure(3, weight=1)
        self.root.focus_set()

        self.text = Label(self.root, text="Hello World!")
        self.text.grid(row=0, column=2, sticky="n")

        self.create_entry = Entry(self.root)
        self.create_entry.grid(row=1, column=2, sticky="n")

        # make when the user presses enter, the create method is called.
        self.create_entry.bind("<Return>", self.create)

        # make user type as soon as the window opens.
        self.create_entry.focus_set()

        self.create_button = Button(self.root, text="Create", command=self.create)
        self.create_button.grid(row=2, column=2, sticky="n")

        self.something = Button(self.root, text="Something")
        self.something.grid(row=2, column=3, sticky="e")

    def create(self, *_):
        name = self.create_entry.get()
        if name == "":
            Helper.show_error("Please enter a name.")
            return
        self.create_entry.delete(0, "end")

        if not Helper.add_notepad(name):
            Helper.show_error("That notepad already exists.")
            return
