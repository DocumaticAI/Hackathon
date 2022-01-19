import wikipedia

from Functions.PlaySound import MidSound
from Functions.ProjectBase import speak, takeCommand


def WikipediaSearch():
    print("\33[93m" + "\33[1m" + "What should I search on Wikipedia?" + "\33[0m" + "\n")
    speak("What should I search on Wikipedia?")
    term = takeCommand()
    if term:
        try:
            result = wikipedia.summary(term)
            print("\33[1m" + "Wikipedia: " + "\33[92m" + result.strip() + "\33[0m" + "\n")
            speak(result.strip())
        except wikipedia.exceptions.PageError:
            speak(f"Sorry, but I couldn't find anything related to {term} on wikipedia.")
        MidSound()
    else:
        WikipediaSearch()
