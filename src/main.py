from tkinter import Tk
from classes.master import Master
from classes.password import Password

def main():
    window = Tk()
    window.title("Note-Pads - by: @Takenkills, @Ashh")
    window.resizable(width=False, height=False)
    window.geometry("400x400")
    window.eval("tk::PlaceWindow %s center" % window.winfo_toplevel())

    Password(window)
    Master(window)

    window.mainloop()

if __name__ == "__main__":
    main()
