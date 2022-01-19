import pyttsx3
import speech_recognition

from Functions.PlaySound import OpeningSound

engine = pyttsx3.init("sapi5")
voices = engine.getProperty("voices")
engine.setProperty("voice", voices[0].id)


def speak(text):
    engine.say(text)
    engine.runAndWait()


def takeCommand():
    speech = speech_recognition.Recognizer()
    speech.pause_threshold = 0.5
    with speech_recognition.Microphone(device_index=1) as AudioSource:
        OpeningSound()
        print("\33[31m" + "\33[1m" + "Listening..." + "\33[0m" + "\n")
        speech.adjust_for_ambient_noise(AudioSource)
        audio = speech.listen(AudioSource)
    try:
        query = speech.recognize_google(audio).lower()
        print("\33[92m" + "\33[1m" + "You said: " + "\33[0m" + query + "\n")
    except speech_recognition.UnknownValueError:
        query = None
    return query
