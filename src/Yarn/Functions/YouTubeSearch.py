import webbrowser

from Functions.PlaySound import MidSound
from Functions.ProjectBase import speak, takeCommand


def YouTubeSearch():
    print("\33[93m" + "\33[1m" + "What should I search on YouTube?" + "\33[0m" + "\n")
    speak("What should I search on YouTube?")
    term = takeCommand()
    if term:
        webbrowser.open(f"https://www.youtube.com/results?search_query={term}")
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
            + " on YouTube."
            + "\33[0m"
            + "\n"
        )
        speak(f"Searching {term} on YouTube.")
        MidSound()
    else:
        YouTubeSearch()
