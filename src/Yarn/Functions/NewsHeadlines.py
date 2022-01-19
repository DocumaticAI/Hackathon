import urllib.parse
import urllib.request

from word2number import w2n
from bs4 import BeautifulSoup as bs

from Functions.PlaySound import MidSound
from Functions.ProjectBase import speak, takeCommand


def NewsHeadlines():
    try:
        url = "https://news.google.com/news/rss"
        if url.lower().startswith("http"):
            news = urllib.request.urlopen(url).read()
            headlines = bs(news, "xml").findAll("item")
            news_headlines = []
            for new in headlines:
                news_headlines.append(new.title.text)
            print(
                "\33[93m"
                + "\33[1m"
                + "How many headlines you want me to read?"
                + "\33[0m"
                + "\n"
            )
            speak("How many headlines you want me to read?")
            number = takeCommand()
            if number:
                num = w2n.word_to_num(number)
                if num > len(news_headlines):
                    num = len(news_headlines)
                for i in range(num):
                    if i + 1 == num:
                        print(
                            "\33[1m"
                            + f"{i + 1}) "
                            + "\33[0m"
                            + "\33[92m"
                            + news_headlines[i]
                            + "\33[0m"
                            + "\n"
                        )
                        speak(news_headlines[i])
                        MidSound()
                    else:
                        print(
                            "\33[1m"
                            + f"{i + 1}) "
                            + "\33[0m"
                            + "\33[92m"
                            + news_headlines[i]
                            + "\33[0m"
                        )
                        speak(news_headlines[i])
        else:
            NewsHeadlines()
    except ValueError:
        NewsHeadlines()
