import random
import pyperclip
from word2number import w2n

from Functions.PlaySound import MidSound
from Functions.ProjectBase import speak, takeCommand


def PasswordGen():
    try:
        AlphaNum = list("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")
        SpecialChar = list("@#$%=:?./|~>*()<")
        
        Allowed = AlphaNum
        print(
            "\33[92m"
            + "\33[1m"
            + "What should be the password length?"
            + "\33[0m"
            + "\n"
        )
        speak("What should be the password length?")
        length = takeCommand()
        if length:
            print(
                "\33[33m"
                + "\33[1m"
                + "Do you want special characters in your password?"
                + "\33[0m"
                + "\n"
            )
            speak("Do you want special characters in your password?")
            special = takeCommand()
            if special:
                if "yes" in special.lower():
                    Allowed += SpecialChar
                Password = ""
                for _ in range(w2n.word_to_num(length)):
                    Password = Password + random.choice(Allowed)
                print("\33[1m" + "Password: " + "\33[92m" + Password + "\33[0m" + "\n")
                speak("Your password has been generated and copied to the clipboard.")
                MidSound()
                pyperclip.copy(Password)
            else:
                Password = ""
                for _ in range(w2n.word_to_num(length)):
                    Password = Password + random.choice(Allowed)
                print("\33[1m" + "Password: " + "\33[92m" + Password + "\33[0m" + "\n")
                speak("Your password has been generated and copied to the clipboard.")
                MidSound()
                pyperclip.copy(Password)
        else:
            PasswordGen()
    except ValueError:
        PasswordGen()
