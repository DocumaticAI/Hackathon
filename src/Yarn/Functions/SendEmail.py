import smtplib

from Config.Config import config
from Functions.PlaySound import MidSound
from Functions.ProjectBase import speak, takeCommand


def SendEmail():
    print("\33[93m" + "\33[1m" + "What is the message?" + "\33[0m" + "\n")
    speak("What is the message?")
    message = takeCommand()
    if message:
        speak("Would you like to change the message?")
        print("\33[93m" + "\33[1m" + "Would you like to change the message?" + "\33[0m" + "\n")
        correctMessage = takeCommand()
        if correctMessage and correctMessage == "no":
            speak("Please enter the receiver's email address.")
            print("\33[93m" + "\33[1m" + "Receiver's Email: " + "\33[0m", end="")
            Email_to = input()
            smtp = smtplib.SMTP("smtp.gmail.com", 587)
            smtp.starttls()
            smtp.login(str(config["Email"]), str(config["Password"]))
            smtp.sendmail(str(config["Email"]), Email_to, message)
            smtp.quit()
            print(
                "\33[92m"
                + "\33[1m"
                + f"\nSuccessfully sent a mail to "
                + "\33[0m"
                + "\33[93m"
                + "\33[1m"
                + Email_to
                + "\33[0m"
                + "\n"
            )
            speak(f"Successfully sent a mail to {Email_to}")
            MidSound()
        else:
            SendEmail()
