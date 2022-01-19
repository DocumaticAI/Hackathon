import webbrowser

from Functions.PlaySound import MidSound
from Functions.ProjectBase import speak, takeCommand


def GoogleSearch():
    print("\33[93m" + "\33[1m" + "What should I search on Google?" + "\33[0m" + "\n")
    speak("What should I search on Google?")
    term = takeCommand()
    if term:
        webbrowser.open("https://www.google.com/search?q=" + term)
        print(
            "\33[93m"
            + "\33[1m"
            + "Searching "
            + "\33[0m"
            + "\33[92m"
            + "\33[1m"
            + term
            + "\33[0m"
            + "\33[93m"
            + "\33[1m"
            + " on Google."
            + "\33[0m"
            + "\n"
        )
        speak(f"Searching {term} on Google.")
        MidSound()
    else:
        GoogleSearch()
