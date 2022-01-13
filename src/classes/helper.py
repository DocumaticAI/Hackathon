from os.path import join, dirname, abspath, exists, isfile
from os import mkdir, remove, listdir
from tkinter import messagebox
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
        return join(Helper.get_notepads_directory(), name)

    @staticmethod
    def add_notepad(name: str, file_path: str = None) -> bool:
        directory = Helper.get_notepads_directory()
        path = join(directory, name) + ".txt"

        if file_path:
            path = file_path

        if exists(path):
            return False

        with open(path, "w"):
            pass

        return True

    @staticmethod
    def delete_notepad(name: str, file_path: str = None) -> bool:
        directory = Helper.get_notepads_directory()
        path = join(directory, name)

        if file_path:
            path = file_path

        if not exists(path):
            return False

        remove(path)

        return True

    @staticmethod
    def get_notepads() -> list[str]:
        directory = Helper.get_notepads_directory()

        return [f for f in listdir(directory) if isfile(join(directory, f))]

    @staticmethod
    def show_error(error_message: str):
        messagebox.showerror("Error", error_message)
