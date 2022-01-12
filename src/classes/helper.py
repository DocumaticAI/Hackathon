from os import path as os_path
from os import mkdir, remove
from tkinter import messagebox
from __main__ import __file__ as main_file

class Helper:
    @staticmethod
    def get_notepads_directory():
        return os_path.join(os_path.dirname(os_path.abspath(main_file)), "notepads")

    @staticmethod
    def get_notepad_path(name: str):
        return os_path.join(Helper.get_notepads_directory(), name)

    @staticmethod
    def add_notepad(name: str, file_path: str = None) -> bool:
        directory = Helper.get_notepads_directory()
        if not os_path.exists(directory):
            mkdir(directory)

        path = os_path.join(directory, name) + ".txt"

        if file_path:
            path = file_path

        if os_path.exists(path):
            return False

        with open(path, "w"):
            pass

        return True

    @staticmethod
    def delete_notepad(name: str, file_path: str = None) -> bool:
        directory = Helper.get_notepads_directory()
        if not os_path.exists(directory):
            mkdir(directory)

        path = os_path.join(directory, name)

        if file_path:
            path = file_path

        if not os_path.exists(path):
            return False

        remove(path)

        return True

    @staticmethod
    def get_notepads(path: str = None):
        pass

    @staticmethod
    def show_error(error_message: str):
        messagebox.showerror("Error", error_message)
