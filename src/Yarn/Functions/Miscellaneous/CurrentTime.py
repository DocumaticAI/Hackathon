import datetime

from Functions.ProjectBase import speak
from Functions.PlaySound import MidSound


def CurrentTime():
    strTime = datetime.datetime.now().strftime("%H:%M:%S")
    print(
        "\33[93m"
        + "\33[1m"
        + "Sir, the current time is "
        + "\33[0m"
        + "\33[92m"
        + "\33[1m"
        + f"{strTime.split(':')[0]} hours, {strTime.split(':')[1]} minutes and {strTime.split(':')[2]} {'seconds' if strTime.split(':')[2] > 1 else 'second'}."
        + "\33[0m"
        + "\n"
    )
    speak(f"Sir the current time is {strTime}")
    MidSound()
