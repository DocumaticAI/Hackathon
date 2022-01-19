from random import randint

from Functions.PlaySound import MidSound
from Functions.ProjectBase import speak, takeCommand


def RPS():
    options = ["Rock", "Paper", "Scissors"]
    computer = options[randint(0, 2)]
    print(
        "\33[93m"
        + "\33[1m"
        + "Choose an option from rock, paper and scissors."
        + "\33[0m"
        + "\n"
    )
    speak("Choose an option from rock, paper and scissors.")
    term = takeCommand()
    if term.lower() == computer.lower():
        print(
            "\33[93m"
            + "\33[1m"
            + f"Both of us chose {computer.lower()}. So, it's a tie!"
            + "\33[0m"
            + "\n"
        )
        speak(f"Both of us choose {computer.lower()}. So, it's a tie!")
        MidSound()
    elif term.lower() == "rock":
        if computer == "Paper":
            print(
                "\33[91m"
                + "\33[1m"
                + "You chose rock and I chose paper. So, I won!"
                + "\33[0m"
                + "\n"
            )
            speak("You chose rock and I chose paper. So, I won!")
            MidSound()
        else:
            print(
                "\33[92m"
                + "\33[1m"
                + f"You chose rock and I chose {computer.lower()}. So, You won!"
                + "\33[0m"
                + "\n"
            )
            speak(f"You chose rock and I chose {computer.lower()}. So, You won!")
            MidSound()
    elif term.lower() == "paper":
        if computer == "Scissors":
            print(
                "\33[91m"
                + "\33[1m"
                + "You chose paper and I chose scissors. So, I won!"
                + "\33[0m"
                + "\n"
            )
            speak("You chose paper and I chose scissors. So, I won!")
            MidSound()
        else:
            print(
                "\33[92m"
                + "\33[1m"
                + f"You chose paper and I chose {computer.lower()}. So, You won!"
                + "\33[0m"
                + "\n"
            )
            speak(f"You chose paper and I chose {computer.lower()}. So, You won!")
            MidSound()
    elif term.lower() == "scissors":
        if computer == "Rock":
            print(
                "\33[91m"
                + "\33[1m"
                + "You chose scissors and I chose rock. So, I won!"
                + "\33[0m"
                + "\n"
            )
            speak("You chose scissors and I chose rock. So, I won!")
            MidSound()
        else:
            print(
                "\33[92m"
                + "\33[1m"
                + f"You chose scissors and I chose {computer.lower()}. So, You won!"
                + "\33[0m"
                + "\n"
            )
            speak(f"You chose scissors and I chose {computer.lower()}. So, You won!")
            MidSound()
    else:
        RPS()
