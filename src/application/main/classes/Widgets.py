from tkinter.ttk import Style, Label, Entry, Scrollbar
from tkinter import Listbox, Button, Canvas, Text, Menu

# Couldn't import them from the main file.
DARK_MODE = "#25292e"
WHITE = "#ffffff"
LIGHT_GREY = "#d3d3d3"

class Widgets:
    @staticmethod
    def create_label(parent, **kwargs) -> Label:
        label = Label(parent, **kwargs)

        label.configure(background=DARK_MODE, foreground=WHITE, font=('American typewriter', 9))

        return label

    @staticmethod
    def create_button(parent, **kwargs) -> Button:
        button = Button(parent, **kwargs)

        button.configure(bg=DARK_MODE, fg=WHITE, font=('American typewriter', 9), activebackground=LIGHT_GREY, activeforeground=DARK_MODE)  # color.
        button.configure(borderwidth=2, width=9, relief="ridge")

        return button

    @staticmethod
    def create_entry(parent, **kwargs) -> Entry:
        entry = Entry(parent, **kwargs)

        entry.configure(background=DARK_MODE, foreground=DARK_MODE)

        return entry

    @staticmethod
    def create_listbox(parent, **kwargs) -> Listbox:
        listbox = Listbox(parent, **kwargs)

        listbox.configure(background=DARK_MODE, foreground=WHITE, selectbackground=WHITE, selectforeground=DARK_MODE, bd=0)

        return listbox

    @staticmethod
    def create_canvas(parent, **kwargs):
        canvas = Canvas(parent, **kwargs)

        canvas.configure(background=DARK_MODE)

        return canvas

    @staticmethod
    def create_scrollbar(parent, **kwargs) -> Scrollbar:
        scrollbar = Scrollbar(parent, **kwargs)

        return scrollbar

    @staticmethod
    def create_text(parent, **kwargs) -> Text:
        text = Text(parent, **kwargs)

        text.configure(background=DARK_MODE, foreground=WHITE, font=('American typewriter', 9))

        return text

    @staticmethod
    def create_menu(parent, **kwargs) -> Menu:
        menu = Menu(parent, **kwargs)

        menu.configure(background=DARK_MODE, foreground=WHITE, activebackground=LIGHT_GREY, activeforeground=DARK_MODE)

        return menu

    @staticmethod
    def set_dark(name: str):
        style = Style()
        style.configure(name, background=DARK_MODE, foreground=WHITE)

    @staticmethod
    def get_theme():
        style = Style()
        return style.theme_use()
