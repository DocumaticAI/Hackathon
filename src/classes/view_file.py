from tkinter import Tk, Toplevel, Frame
from classes.helper import Helper
from classes.Widgets import Widgets

class ViewFile:
    def __init__(self, root: Tk, name: str, imported: bool = False):
        self.root = root
        self.name = name

        path = ""
        if imported:
            path = Helper.get_imported_file_path(self.name)
        else:
            path = Helper.get_notepad_path(self.name)

        with open(path, 'r') as file:
            self.contents = file.read()

        if self.contents == "":
            self.contents = "File is empty."

        self.top: Toplevel = Helper.setup_top(self.root, self.name, withdraw=False, protocol=False)

        getter_w = get_width(self.contents.split("\n"))

        width = 0
        if getter_w < 300:
            width = 300
        elif self.root.winfo_screenwidth() > getter_w:
            width = getter_w
        else:
            width = self.root.winfo_screenwidth()

        height = get_height(self.contents.split("\n"))

        self.top.geometry(f"{width}x{height}")

        self.main_frame = Frame(self.top)
        self.main_frame.pack(fill="both", expand=1)

        self.canvas = Widgets.create_canvas(self.main_frame)
        self.canvas.pack(side="left", fill="both", expand=True)

        self.scrollbar = Widgets.create_scrollbar(self.main_frame, orient="vertical", command=self.canvas.yview)
        self.scrollbar.pack(side="right", fill="y")

        self.canvas.configure(yscrollcommand=self.scrollbar.set)

        self.inside_frame = Frame(self.canvas)

        self.canvas.bind("<Configure>", lambda e: self.canvas.configure(scrollregion=self.canvas.bbox("all")))
        # thanks math
        self.top.bind("<Down>", lambda e: self.canvas.yview_scroll(3, 'units'))
        self.top.bind("<Up>", lambda e: self.canvas.yview_scroll(-3, 'units'))
        self.top.bind("<MouseWheel>", lambda e: self.canvas.yview_scroll(int(-1 * (e.delta / 40)), "units"))

        self.canvas.create_window((0, 0), window=self.inside_frame, anchor="center")

        Widgets.create_label(self.inside_frame, text=self.contents).pack(side="top", fill="both", expand=True)

def get_width(str_list: list) -> int:
    pad = 50 * 2  # 100px padding.

    length = get_longest_str(str_list, return_length=True)
    char_length = 6.7  # each character is in fact 6.7 pixels wide.

    return int(length * char_length) + pad


def get_height(str_list: list) -> int:
    line_height = 20  # each line is 20 pixels tall.
    height = len(str_list) * line_height
    pad = 20 * 4  # 4 lines of padding.

    return height + pad

def get_longest_str(str_list: list, **kwargs) -> int:
    char_count = 0
    longest = 0

    for index in range(len(str_list)):
        if len(str_list[index]) > char_count:
            char_count = len(str_list[index])
            longest = index

    if kwargs.get("return_str"):
        return str_list[longest]
    elif kwargs.get("return_length"):
        return char_count

    return longest
