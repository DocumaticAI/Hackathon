from tkinter import Tk, Label
from classes.helper import Helper

class ViewFile:
    def __init__(self, root: Tk, name: str):
        self.root = root
        self.name = name

        self.top = Helper.setup_top(self.root, self.name, withdraw=False, protocol=False)

        with open(Helper.get_notepad_path(self.name), 'r') as file:
            self.contents = file.read()

        if self.contents == "":
            self.contents = "File is empty."

        Label(self.top, text=self.contents).pack()
