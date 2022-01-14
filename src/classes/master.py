from tkinter import Tk, Listbox, ANCHOR
from tkinter.ttk import Label, Button, Entry, Frame, Scrollbar
from os.path import exists
from os import startfile, rmdir, removedirs
from classes.helper import Helper
from classes.view_file import ViewFile

class Master:
    def __init__(self, root: Tk):
        self.root = root
        self.x = self.root.winfo_width()

        self.frame_y = self.root.winfo_screenheight() - 730
        self.views = []

        self.root.focus_set()

        self.text = Label(self.root, text="Notepad Plus!")
        self.text.place(anchor="n", y=25, x=self.x / 2)

        self.input_entry = Entry(self.root)
        self.input_entry.place(anchor="n", y=50, x=self.x / 2)
        self.input_entry.bind("<Return>", self.create)
        self.input_entry.focus_set()

        self.create_button = Button(self.root, text="Create", command=self.create)
        self.create_button.place(anchor="n", x=(self.x / 2) + 105, y=48)

        self.list_frame = Frame(self.root)

        self.list_scrollbar = Scrollbar(self.list_frame, orient="vertical")

        self.list_box = Listbox(self.list_frame, width=40, yscrollcommand=self.list_scrollbar.set)

        self.list_scrollbar.config(command=self.list_box.yview)
        self.list_scrollbar.pack(side="right", fill="y")

        self.list_frame.place(x=80, y=self.frame_y, anchor="w")
        self.list_box.pack()

        self.view_button = Button(self.root, text="View", command=self.view)
        self.view_button.place(y=self.frame_y + 90, x=90)

        self.open_button = Button(self.root, text="Open", command=self.open)
        self.open_button.place(y=self.frame_y + 90, x=165)

        self.delete_button = Button(self.root, text="Delete", command=self.delete)
        self.delete_button.place(y=self.frame_y + 90, x=240)

        self.delete_button = Button(self.root, text="Delete All", command=self.delete_all)
        self.delete_button.place(y=self.frame_y + 115, x=165)

        self.set_notepads()

    def open(self):
        name = self.list_box.get(ANCHOR)
        if name == "":
            Helper.show_error("Please select a notepad.")
            return

        startfile(Helper.get_notepad_path(name))

    def view(self, *_):
        name = self.list_box.get(ANCHOR)
        if name == "":
            Helper.show_error("Please select a notepad.")
            return

        if not exists(Helper.get_notepad_path(name)):
            Helper.show_error("That notepad does not exist.")
            return

        ViewFile(self.root, name)

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
        name = self.list_box.get(ANCHOR)
        if name == "":
            Helper.show_error("Please select a notepad.")
            return

        delete = Helper.delete_notepad(name)

        if not delete:
            Helper.show_error("That notepad does not exist.")
            return
        elif delete == "perm":
            Helper.show_error("I do not have permissions to delete files. Please run me as an administrator.")
            return

        self.list_box.delete(ANCHOR)
        self.remove_view(name)

    def add_view(self, name):
        self.views.append(name)
        self.set_views()

    def remove_view(self, name):
        if name in self.views:
            self.views.remove(name)
        self.set_views()

    def set_views(self):
        items: list = self.list_box.get(0, "end")

        for view in self.views:
            if view in items:
                continue
            else:
                if exists(Helper.get_notepad_path(view)):
                    self.list_box.insert("end", view)

    def set_notepads(self):
        notepads: list[str] = Helper.get_notepads()

        if len(notepads) == 0:
            return

        for notepad in notepads:
            self.list_box.insert("end", notepad.removesuffix(".txt"))
            self.views.append(notepad)

    def delete_all(self):
        try:
            for notepad in Helper.get_notepads():
                Helper.delete_notepad(notepad.removesuffix(".txt"))
        except OSError:
            Helper.show_error("I do not have permissions to delete files. Please run me as an administrator.")
            return

        self.views = []
        self.list_box.delete(0, "end")
