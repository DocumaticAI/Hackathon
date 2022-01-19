# Regular import
import sys

# Regular Functions
from Functions.Greet import Greet
from Functions.YouTubePlay import YouTubePlay
from Functions.ProjectBase import takeCommand
from Functions.GoogleSearch import GoogleSearch
from Functions.YouTubeSearch import YouTubeSearch

# Miscellaneous Functions
from Functions.Miscellaneous.Quit import Quit
from Functions.Miscellaneous.OpenGoogle import OpenGoogle
from Functions.Miscellaneous.OpenYoutube import OpenYoutube
from Functions.Miscellaneous.CurrentTime import CurrentTime
from Functions.Miscellaneous.TellmeaJoke import TellmeaJoke
from Functions.Miscellaneous.WikipediaSearch import WikipediaSearch

# Greet Function
try:
    Greet()
except KeyboardInterrupt:
    sys.exit()

# Main Code
while True:

    try:

        command = takeCommand()

        if command:

            if "open google" in command:
                try:
                    OpenGoogle()
                except KeyboardInterrupt:
                    sys.exit()

            elif "open youtube" in command:
                try:
                    OpenYoutube()
                except KeyboardInterrupt:
                    sys.exit()

            elif "time" in command in command:
                try:
                    CurrentTime()
                except KeyboardInterrupt:
                    sys.exit()

            elif "joke" in command:
                try:
                    TellmeaJoke()
                except KeyboardInterrupt:
                    sys.exit()

            elif "search on google" in command:
                try:
                    GoogleSearch()
                except KeyboardInterrupt:
                    sys.exit()

            elif "search on youtube" in command:
                try:
                    YouTubeSearch()
                except KeyboardInterrupt:
                    sys.exit()

            elif "play on youtube" in command:
                try:
                    YouTubePlay()
                except KeyboardInterrupt:
                    sys.exit()

            elif "wikipedia" in command:
                try:
                    WikipediaSearch()
                except KeyboardInterrupt:
                    sys.exit()

            elif "shutdown" in command:
                try:
                    Quit()
                except KeyboardInterrupt:
                    sys.exit()

    except KeyboardInterrupt:
        sys.exit()
