import requests
import webbrowser
import urllib.parse

from Functions.PlaySound import MidSound
from Functions.ProjectBase import speak, takeCommand


def YouTubePlay():
    print("\33[93m" + "\33[1m" + "What should I play on YouTube?" + "\33[0m" + "\n")
    speak("What should I play on YouTube?")
    song = takeCommand()
    if song:
        url = f"https://api.sujalgoel.engineer/private/ytsr?query={urllib.parse.quote(song)}"
        response = requests.get(url, headers = {'User-agent': 'Yarn@100305'}).json()
        if response:
            webbrowser.open(response["url"])
            title = response["title"]
            print(
                "\33[93m"
                + "\33[1m"
                + "Playing "
                + "\33[0m"
                + "\33[92m"
                + "\33[1m"
                + response["title"]
                + "\33[0m"
                + "\33[93m"
                + "\33[1m"
                + " on YouTube."
                + "\33[0m"
                + "\n"
            )
            speak(f"Playing {title} on YouTube.")
            MidSound()
    else:
        YouTubePlay()
