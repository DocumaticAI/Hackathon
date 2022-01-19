import os
import time
import requests
import youtube_dl
import urllib.request

from pydub import AudioSegment
from pydub.playback import play

from Functions.PlaySound import MidSound
from Functions.ProjectBase import speak, takeCommand


# Example from https://github.com/ytdl-org/youtube-dl#embedding-youtube-dl
def YTDL(url, Title):
    class MyLogger:
        def debug(self, msg):
            pass  # To hide the debug info

        def warning(self, msg):
            pass  # To hide the warning info

        def error(self, msg):
            pass  # To hide the error info

    def hook(d):
        if d["status"] == "finished":
            print(
                "\33[93m"
                + "\33[1m"
                + "Playing "
                + "\33[0m"
                + "\33[92m"
                + "\33[1m"
                + Title
                + "\33[0m"
                + "\n"
            )
            speak(f"Playing {Title}")

    ydl_opts = {
        "format": "bestaudio/best",
        "postprocessors": [
            {
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                "preferredquality": "192",
            }
        ],
        "outtmpl": "/Music/%(title)s.%(ext)s",
        "logger": MyLogger(),
        "progress_hooks": [hook],
    }

    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])


def PlaySong():
    print("\33[93m" + "\33[1m" + "What song do you want me to play?" + "\33[0m" + "\n")
    speak("What song do you want me to play?")
    song = takeCommand()
    if song:
        url = f"https://api.sujalgoel.engineer/private/ytsr?query={urllib.parse.quote(song)}"
        response = requests.get(url, headers = {'User-agent': 'Yarn@100305'}).json()
        url = response["url"]
        Title = response["title"]
        Title = (
            Title.replace("/", "_")
            .replace("\\", "_")
            .replace(":", "_")
            .replace("*", "_")
            .replace("?", "_")
            .replace('"', "_")
            .replace("<", "_")
            .replace(">", "_")
            .replace("|", "_")
        )
        FileExists = os.path.isfile("./Music/" + Title + ".mp3")
        FileName = f"{os.getcwd()}\\Music\\{Title}.mp3"
        if FileExists:
            print(
                "\33[93m"
                + "\33[1m"
                + "Playing "
                + "\33[0m"
                + "\33[92m"
                + "\33[1m"
                + Title
                + "\33[0m"
                + "\n"
            )
            speak(f"Playing {Title}")
            play(AudioSegment.from_mp3(FileName))
            time.sleep(0.5)
            MidSound()
        else:
            print(
                "\33[93m"
                + "\33[1m"
                + "Downloading "
                + "\33[0m"
                + "\33[92m"
                + "\33[1m"
                + Title
                + "\33[0m"
                + "\n"
            )
            speak(f"Downloading {Title}")
            YTDL(url, Title)
            play(AudioSegment.from_mp3(FileName))
            time.sleep(0.5)
            MidSound()
    else:
        PlaySong()
