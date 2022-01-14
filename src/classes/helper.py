from os.path import join, dirname, abspath, exists, isfile
from os import mkdir, remove, listdir
from tkinter import messagebox, Toplevel, Tk, PhotoImage
from __main__ import __file__ as main_file

class Helper:
    @staticmethod
    def get_notepads_directory():
        path = join(dirname(abspath(main_file)), "notepads")

        if not exists(path):
            mkdir(path)

        return path

    @staticmethod
    def get_notepad_path(name: str):
        return join(Helper.get_notepads_directory(), name) + ".txt"

    @staticmethod
    def add_notepad(name: str, file_path: str = None) -> bool:
        path = Helper.get_notepad_path(name)

        if file_path:
            path = file_path

        if exists(path):
            return False

        with open(path, "w"):
            pass

        return True

    @staticmethod
    def delete_notepad(name: str, file_path: str = None) -> bool | str:
        path = Helper.get_notepad_path(name)

        if file_path:
            path = file_path

        if not exists(path):
            return False

        try:
            remove(path)
        except OSError:
            return "perm"

        return True

    @staticmethod
    def get_notepads() -> list[str]:
        directory = Helper.get_notepads_directory()

        return [f for f in listdir(directory) if isfile(join(directory, f)) and f.endswith(".txt") and f != "__password__.txt"]

    @staticmethod
    def show_error(error_message: str):
        messagebox.showerror("Error", error_message)

    @staticmethod
    def setup_top(parent: Tk, title: str, **kwargs):
        if "withdraw" not in kwargs:
            parent.withdraw()

        top = Toplevel(parent)
        top.title(title)
        top.geometry("300x100")
        top.resizable(False, False)
        top.focus_set()

        icon = PhotoImage(file=join(dirname(main_file), "assets\\notepad+.png"))
        top.iconphoto(False, icon)

        def destroy():
            top.destroy()
            parent.destroy()

        if "protocol" not in kwargs:
            top.protocol("WM_DELETE_WINDOW", destroy)

        return top
