import requests

from Config.Config import config
from Functions.ProjectBase import speak
from Functions.PlaySound import MidSound


def GetAQI():
    url = f"https://api.waqi.info/feed/here/?token={config['AQIAPI']}"
    response = requests.get(url).json()["data"]
    print(
        "\33[1m"
        + "\33[92m"
        + "The air quality index in your region is"
        + "\33[0m"
        + "\33[1m"
        + "\33[93m"
        + f" {response['aqi']}"
        + "\33[0m"
        + "\33[1m"
        + "\33[92m"
        + f" and the dominent pollutant is "
        + "\33[0m"
        + "\33[1m"
        + "\33[93m"
        + f"{response['dominentpol']}"
        + "\33[0m"
        + "\33[1m"
        + "\33[92m"
        + "."
        + "\33[0m"
        + "\n"
    )
    speak(f"The air quality index in your region is {response['aqi']} and the dominent pollutant is {response['dominentpol']}.")
    MidSound()
