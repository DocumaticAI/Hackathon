import requests
import urllib.parse

from Config.Config import config
from Functions.PlaySound import MidSound
from Functions.ProjectBase import speak, takeCommand


def Weather():
    print(
        "\33[93m" + "\33[1m" + "What city do you want to know about?" + "\33[0m" + "\n"
    )
    speak("What city do you want to know about?")
    city = takeCommand()
    if city:
        url = f"https://api.openweathermap.org/data/2.5/weather?appid={config['WeatherAPI']}&q={urllib.parse.quote(city)}"
        response = requests.get(url).json()
        if response["cod"] != "404":
            print(
                "\33[93m"
                + "\33[1m"
                + f"Current weather in {response['name']}"
                + "\33[0m"
                + "\33[93m"
                + "\33[1m"
                + " is "
                + "\33[0m"
                + "\33[92m"
                + "\33[1m"
                + response["weather"][0]["main"]
                + "\33[0m"
                + "\33[93m"
                + "\33[1m"
                + " and temperature is "
                + "\33[0m"
                + "\33[92m"
                + "\33[1m"
                + str(
                    format(
                        response["main"]["temp"] - 273.15,
                        ".2f",
                    )
                )
                + "°C."
                + "\33[0m"
                + "\33[93m"
                + "\33[1m"
                + " Humidity is "
                + "\33[0m"
                + "\33[92m"
                + "\33[1m"
                + str(response["main"]["humidity"])
                + "%."
                + "\33[0m"
                + "\n"
            )
            weather = (
                "Current weather in "
                + response["name"]
                + " is "
                + response["weather"][0]["main"]
                + " and temperature is "
                + str(
                    format(
                        response["main"]["temp"] - 273.15,
                        ".2f",
                    )
                )
                + "°C. Humidity is "
                + str(response["main"]["humidity"])
                + "%."
            )
            speak(weather)
            MidSound()
        else:
            print(
                "\33[91m"
                + "\33[1m"
                + "Sorry, I couldn't find that city."
                + "\33[0m"
                + "\n"
            )
            speak("Sorry, I couldn't find that city.")
    else:
        Weather()
