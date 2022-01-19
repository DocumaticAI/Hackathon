import webbrowser

from Functions.ProjectBase import speak
from Functions.PlaySound import MidSound

def help():
    url = "https://github.com/sujalgoel/Hackathon/tree/master/src/Yarn#help-menu"
    webbrowser.open(url)
    print("\33[92m" + "\33[1m" + "Opening help menu." + "\33[0m" + "\n")
    speak("Opening help menu.")
    MidSound()
