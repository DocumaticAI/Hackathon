from tkinter import Tk, Toplevel, Listbox
from os import rename
from os.path import splitext, dirname, join
from classes.helper import Helper
from classes.Editor import Editor
from classes.Widgets import Widgets
from random import randint

class EditMenu:
    def __init__(self, name: str, path: str, window: Tk, listbox: Listbox):
        self.name = name
        self.path = path
        self.window = window
        self.listbox = listbox

        self.root: Toplevel = Helper.setup_top(self.window, f"Edit Menu: ({self.name})", geometry="300x150", withdraw=False, protocol=False)
        self.root.resizable(False, False)

        self.window.eval(f"tk::PlaceWindow {self.root} center")

        self.x = self.root.winfo_width()

        self.sub_title = Widgets.create_label(self.root, text="Edit Menu")
        self.sub_title.place(x=self.x / 2, y=25, anchor="n")

        self.input_entry = Widgets.create_entry(self.root, width=20, text="New Name")
        self.input_entry.place(x=self.x / 2, y=50, anchor="n")
        self.input_entry.focus_set()
        self.input_entry.bind("<Return>", self.rename_file)

        self.input_entry.delete(0, "end")

        self.rename_button = Widgets.create_button(self.root, text="Rename", command=self.rename_file)
        self.rename_button.place(y=48, x=self.x / 2 + 100, anchor="n")

        self.edit_button = Widgets.create_button(self.root, text="Open Editor", command=self.run_editor)
        self.edit_button.place(y=80, x=115)

    def run_editor(self, *_):
        directory = dirname(self.path).split("\\")[-1]
        path = None

        if directory == "imported":
            path = Helper.get_imported_file_path(self.name).split("\n")[0]

        _path = self.path if not path else path
        return Editor(self.name, _path, self.window)

    def rename_file(self, *_):
        new_name = self.input_entry.get()

        if new_name == "" or new_name is None:
            return

        file_dir = dirname(self.path)
        file_ext = splitext(self.path)[1]

        new_path = join(file_dir, new_name + file_ext)

        if new_name == self.name:
            Helper.show_error("That's the same name.", self.window)
            return

        if Helper.file_exists(new_path):
            Helper.show_error(f"File {new_name} already exists!", self.window)
            return

        try:
            rename(self.path, new_path)
            original_path = Helper.get_imported_file_path(new_name)
            new_original_path = join(dirname(Helper.get_imported_file_path(new_name)), new_name + ".txt")

            rename(original_path, new_original_path)

            with open(new_path, "w") as file:
                file.write(new_original_path)

        except Exception as e:
            print(e)
            Helper.show_error("Unable to rename file.", self.window)

        self.root.destroy()
        index = self.listbox.get(0, "end").index(self.name)
        self.listbox.delete(index)
        self.listbox.insert(index, new_name)

        return EditMenu(new_name, new_path, self.window, self.listbox)
