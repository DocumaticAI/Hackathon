import random

from Functions.PlaySound import MidSound
from Functions.ProjectBase import speak, takeCommand


def GTN():
    live = 6
    win = False
    guesses = 0
    num = random.randint(0, 1000)
    print(
        "\33[93m"
        + "\33[1m"
        + f"The number is chosen and you only have {live} chances to guess that number."
        + "\33[0m"
        + "\n"
    )
    speak(
        f"The number is chosen and you only have {live} chances to guess that number."
    )
    while guesses < live:
        guesses += 1
        try:
            speak("Enter your guess.")
            print("\33[93m" + "\33[1m" + "Enter your guess: " + "\33[0m", end="")
            guess = int(input())
        except ValueError:
            speak("Enter your guess.")
            print("\33[93m" + "\33[1m" + "Enter your guess: " + "\33[0m", end="")
            guess = int(input())
        if guess == num:
            print(
                "\33[92m"
                + "\33[1m"
                + "\nCongratulations, you have won the game in "
                + "\33[0m"
                + "\33[91m"
                + "\33[1m"
                + str(guesses)
                + "\33[0m"
                + "\33[92m"
                + "\33[1m"
                + f" {'guesses' if guesses > 1 else 'guess'}."
                + "\33[0m"
                + "\n"
            )
            win = True
            speak(
                f"Congratulations, you have won the game in {guesses} {'guesses' if guesses > 1 else 'guess'}."
            )
            MidSound()
            break

        if guess < num:
            if (live - guesses) != 0:
                print(
                    "\33[91m"
                    + "\33[1m"
                    + "\nThe number is greater than "
                    + "\33[0m"
                    + "\33[92m"
                    + "\33[1m"
                    + str(guess)
                    + "."
                    + "\33[0m"
                    + "\33[91m"
                    + "\33[1m"
                    + " You have "
                    + "\33[0m"
                    + "\33[92m"
                    + "\33[1m"
                    + str(live - guesses)
                    + "\33[0m"
                    + "\33[91m"
                    + "\33[1m"
                    + f" {'chances' if (live - guesses) > 1 else 'chance'} left."
                    + "\33[0m"
                    + "\n"
                )
                speak(
                    f"The number is greater than {guess}. You have {live - guesses} {'chances' if (live - guesses) > 1 else 'chance'} left."
                )
        elif guess > num and (live - guesses) != 0:
            print(
                "\33[91m"
                + "\33[1m"
                + "\nThe number is smaller than "
                + "\33[0m"
                + "\33[92m"
                + "\33[1m"
                + str(guess)
                + "."
                + "\33[0m"
                + "\33[91m"
                + "\33[1m"
                + " You have "
                + "\33[0m"
                + "\33[92m"
                + "\33[1m"
                + str(live - guesses)
                + "\33[0m"
                + "\33[91m"
                + "\33[1m"
                + f" {'chances' if (live - guesses) > 1 else 'chance'} left."
                + "\33[0m"
                + "\n"
            )
            speak(
                f"The number is smaller than {guess}. You have {live - guesses} {'chances' if (live - guesses) > 1 else 'chance'} left."
            )
    if guesses >= live and win is False:
        print(
            "\33[93m"
            + "\33[1m"
            + "\nIt seems that you ran out of chances. The number which I guessed was "
            + "\33[0m"
            + "\33[1m"
            + str(num)
            + "."
            + "\33[0m"
            + "\n"
        )
        speak(
            f"It seems that you ran out of chances. The number which I guessed was {num}."
        )
        MidSound()
