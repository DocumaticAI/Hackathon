from tkinter import Tk, PhotoImage
from os.path import join, dirname
from classes.master import Master
from classes.password import Password

def main():
    window = Tk()
    window.title("Notepad+ - by: @Takenkills")
    window.resizable(width=False, height=False)
    window.geometry("400x400")
    window.eval("tk::PlaceWindow %s center" % window.winfo_toplevel())

    icon = PhotoImage(file=join(dirname(__file__), "assets\\notepad+.png"))
    window.iconphoto(False, icon)

    Password(window)
    Master(window)

    window.mainloop()

if __name__ == "__main__":
    main()
