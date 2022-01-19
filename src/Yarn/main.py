# Regular import
import os
import sys

# Regular Functions
from Functions.Greet import Greet
from Functions.Weather import Weather
from Functions.PlaySong import PlaySong
from Functions.YouTubePlay import YouTubePlay
from Functions.ProjectBase import takeCommand
from Functions.GoogleSearch import GoogleSearch
from Functions.YouTubeSearch import YouTubeSearch
from Functions.NewsHeadlines import NewsHeadlines

# Miscellaneous Functions
from Functions.Miscellaneous.Quit import Quit
from Functions.Miscellaneous.GetQuote import GetQuote
from Functions.Miscellaneous.AirQuality import GetAQI
from Functions.Miscellaneous.GetAdvice import GetAdvice
from Functions.Miscellaneous.OpenGoogle import OpenGoogle
from Functions.Miscellaneous.OpenYoutube import OpenYoutube
from Functions.Miscellaneous.CurrentTime import CurrentTime
from Functions.Miscellaneous.TellmeaJoke import TellmeaJoke
from Functions.Miscellaneous.WikipediaSearch import WikipediaSearch

# Greet Function
try:
    Greet()
    if not os.path.exists('Music'):
        os.makedirs('Music')
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

            elif "news" in command:
                try:
                    NewsHeadlines()
                except KeyboardInterrupt:
                    sys.exit()

            elif "weather" in command:
                try:
                    Weather()
                except KeyboardInterrupt:
                    sys.exit()

            elif "air quality" in command:
                try:
                    GetAQI()
                except KeyboardInterrupt:
                    sys.exit()

            elif "play a song" in command:
                try:
                    PlaySong()
                except KeyboardInterrupt:
                    sys.exit()

            elif "advice" in command:
                try:
                    GetAdvice()
                except KeyboardInterrupt:
                    sys.exit()

            elif "quote" in command:
                try:
                    GetQuote()
                except KeyboardInterrupt:
                    sys.exit()

            elif "shutdown" in command:
                try:
                    Quit()
                except KeyboardInterrupt:
                    sys.exit()

    except KeyboardInterrupt:
        sys.exit()
