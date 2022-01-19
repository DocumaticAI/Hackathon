import os
import time

from pydub import AudioSegment
from pydub.playback import play

MainDir = os.getcwd()


def OpeningSound():
    play(AudioSegment.from_mp3(f"{MainDir}\\Sounds\\OpeningSound.mp3"))
    time.sleep(0.2)


def MidSound():
    play(AudioSegment.from_mp3(f"{MainDir}\\Sounds\\MidSound.mp3"))
    time.sleep(0.2)


def EndingSound():
    play(AudioSegment.from_mp3(f"{MainDir}\\Sounds\\EndingSound.mp3"))
    time.sleep(0.2)


def LaughSound():
    play(AudioSegment.from_mp3(f"{MainDir}\\Sounds\\LaughSound.mp3"))
    time.sleep(0.6)


def AlarmSound():
    play(AudioSegment.from_mp3(f"{MainDir}\\Sounds\\AlarmSound.mp3"))
    time.sleep(1)