import time
import datetime
import threading

from Functions.PlaySound import AlarmSound, MidSound
from Functions.ProjectBase import speak, takeCommand


def SetAlarm():
    print(
        "\33[93m"
        + "\33[1m"
        + 'The exact hour and minute seperated with ":" (colon) -> Ex: "12:30" \nAlarm time: '
        + "\33[0m",
        end="",
    )
    speak("Please type the time you want to set the alarm to. Make sure to follow the format.")
    message = input()
    if message:
        alarmHour = int(message.split(":")[0])
        alarmMinute = int(message.split(":")[1])
        if alarmHour > 23 or alarmMinute > 60:
            print("\33[91m" + "\33[1m" + "\nPlease enter a valid time." + "\33[0m" + "\n")
            speak("Please enter a valid time.")
            SetAlarm()
        elif alarmHour < 0 or alarmMinute < 0:
            print("\33[91m" + "\33[1m" + "\nPlease enter a valid time." + "\33[0m" + "\n")
            speak("Please enter a valid time.")
            SetAlarm()
        AlarmThread = threading.Thread(
            target=ThreadAlarm, args=(alarmHour, alarmMinute)
        )
        AlarmThread.start()


def ThreadAlarm(alarmHour, alarmMinute):
    alarm_time = datetime.datetime.combine(
        datetime.datetime.now(), datetime.time(alarmHour, alarmMinute)
    )
    waiting_time = alarm_time - datetime.datetime.now()

    if waiting_time < datetime.timedelta(0):
        print(
            "\33[91m"
            + "\33[1m"
            + "\nThe alarm time has passed. Please set the alarm again."
            + "\33[0m"
            + "\n"
        )
        speak("The alarm time has passed. Please set the alarm again.")
        SetAlarm()

    else:
        print("\33[92m" + "\33[1m" + f"Done setting the alarm." + "\33[0m" + "\n")
        speak("Done setting the alarm.")
        MidSound()
        time.sleep((alarm_time - datetime.datetime.now()).total_seconds())
        AlarmSound()
