import requests
import urllib.parse

from Functions.PlaySound import MidSound
from Functions.ProjectBase import speak, takeCommand

Flag = True

def ChatBot():
    global Flag
    if Flag:
        print("\33[93m" + "\33[1m" + "Entering chatbot mode. Say something to activate it." + "\33[0m" + "\n")
        speak("Entering chatbot mode. Please say something to activate it!")
        Flag = False
    while True:
        message = takeCommand()
        if message:
            if "exit" in message:
                print("\33[93m" + "\33[1m" + "Exiting chatbot mode." + "\33[0m" + "\n")
                speak("Exiting chatbot mode.")
                Flag = True
                MidSound()
                break
            else:
                url = f"https://api.sujalgoel.engineer/private/chatbot?message={urllib.parse.quote(message)}"
                response = requests.get(url, headers={"User-agent": "Yarn@100305"}).json()["reply"]
                print("\33[1m" + "Bot: " + "\33[92m" + response + "\33[0m" + "\n")
                speak(response)
        else:
            ChatBot()
