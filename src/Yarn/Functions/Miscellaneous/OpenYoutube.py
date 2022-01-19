import webbrowser

from Functions.ProjectBase import speak
from Functions.PlaySound import MidSound


def OpenYoutube():
    webbrowser.open("https://youtube.com/")
    print("\33[92m" + "\33[1m" + "Opening YouTube." + "\33[0m" + "\n")
    speak("Opening YouTube.")
    MidSound()
