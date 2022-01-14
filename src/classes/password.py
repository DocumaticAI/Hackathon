from classes.helper import Helper
from os.path import join, exists, getsize, dirname
from tkinter import Toplevel, Tk, StringVar, PhotoImage
from tkinter.ttk import Entry, Button, Label
from __main__ import __file__ as main_file

def encrypt(password):
    import hashlib
    return hashlib.sha256(password.encode()).hexdigest()

def create_label(parent: Toplevel, text: str):
    label = Label(parent, text=text)
    label.pack(side="top", fill="x", pady=10)
    return label

class Password:
    tries = 0

    def __init__(self, root: Tk):
        self.root = root

        self.top = Helper.setup_top(self.root, "Enter Password")
        self.root.eval("tk::PlaceWindow %s center" % self.top)

        self.password = self.get_pass()

        self.entry = Entry(self.top, show="*")
        self.entry.pack()
        self.entry.focus_set()
        self.entry.bind("<Return>", self.password_check)

        self.confirm = Button(self.top, text="Confirm", command=self.password_check)
        self.confirm.pack()

    def password_check(self, *_):
        password = self.entry.get()

        if password is None:
            return

        call = self.get_pass()
        real_pass = call if type(call) == str else call.get()

        if real_pass == encrypt(password):
            self.top.destroy()
            self.root.deiconify()
        else:
            self.entry.delete(0, "end")
            self.entry.focus_set()
            Helper.show_error("Wrong password!")

            self.entry.focus_set()

            self.tries += 1

            if self.tries >= 3:
                Helper.show_error("You have entered the wrong password 3 times. Exiting...\n")
                self.top.destroy()
                self.root.destroy()

    def get_pass(self) -> str | StringVar:
        directory = Helper.get_notepads_directory()

        file = join(directory, "__password__.txt")

        if exists(file):
            with open(file, "r") as pass_file:
                if getsize(file) == 0:
                    return self.enter_pass()
                else:
                    return pass_file.read()
        else:
            return self.enter_pass()

    @staticmethod
    def set_pass(password: str, top: Toplevel):
        directory = Helper.get_notepads_directory()

        file = join(directory, "__password__.txt")

        with open(file, "w") as f:
            f.write(encrypt(password))

        top.destroy()

    def enter_pass(self):
        self.top.withdraw()

        top = Toplevel(self.top)

        icon = PhotoImage(file=join(dirname(main_file), "assets\\notepad+.png"))
        top.iconphoto(False, icon)

        self.root.eval("tk::PlaceWindow %s center" % top)

        top.title("Set Password")
        top_label = Label(top, text="You seem new! Type here the password you want to use for your notepad.")
        top_label.pack()

        var = StringVar()

        top_entry = Entry(top, show="*", textvariable=var)
        top_entry.pack()

        def call_back():
            self.set_pass(top_entry.get(), top)
            self.top.deiconify()

        Button(top, text="Confirm", command=call_back).pack()

        return var
