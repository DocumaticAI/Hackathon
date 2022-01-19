import time
import requests

from Config.Config import config
from Functions.PlaySound import MidSound
from Functions.ProjectBase import speak, takeCommand


def LieSwatter():
    response = requests.get("https://api.sujalgoel.engineer/fun/lieswatter", headers={"Authorization": f"Sujal {config['SujalAPI']}"}).json()["data"]
    answer = ""
    Truth = False
    question = response["question"]
    if response["answer"] == "True":
        answer = "no"
        Truth = True
    else:
        answer = "yes"
        Truth = False
    print(
        "\33[93m"
        + "\33[1m"
        + '"'
        + "\33[0m"
        + "\33[1m"
        + question
        + "\33[0m"
        + "\33[93m"
        + "\33[1m"
        + '"'
        + "\33[0m"
        + "\33[1m"
        + " - "
        + "\33[0m"
        + "\33[93m"
        + "\33[1m"
        + "is it a lie? (yes/no)"
        + "\33[0m"
        + "\n"
    )
    speak(question)
    time.sleep(0.5)
    speak("is it a lie?")
    userinput = takeCommand()
    if userinput:
        if answer == userinput.lower():
            print(
                "\33[92m"
                + "\33[1m"
                + f"You are correct! It was a {'Truth' if Truth else 'Lie'}."
                + "\33[0m"
                + "\n"
            )
            speak(f"You are correct! It was a {'Truth' if Truth else 'Lie'}.")
            MidSound()
        else:
            print(
                "\33[91m"
                + "\33[1m"
                + f"You are wrong! It was a {'Truth' if Truth else 'Lie'}."
                + "\33[0m"
                + "\n"
            )
            speak(f"You are wrong! It was a {'Truth' if Truth else 'Lie'}.")
            MidSound()
    else:
        LieSwatter()
