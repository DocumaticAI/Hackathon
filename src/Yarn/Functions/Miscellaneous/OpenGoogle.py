import webbrowser

from Functions.ProjectBase import speak
from Functions.PlaySound import MidSound


def OpenGoogle():
    webbrowser.open("https://google.com/")
    print("\33[92m" + "\33[1m" + "Opening Google." + "\33[0m" + "\n")
    speak("Opening Google.")
    MidSound()
