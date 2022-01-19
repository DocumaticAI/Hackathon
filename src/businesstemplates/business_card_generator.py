"""
Copyright (c) 2022 That GenZ Gamer <thatgenzgamer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"""

from easy_pil import Editor, Canvas, Font, Text
from pathlib import Path


def main():

	print("--------------------------------")
	print("    Business Card Generator    ")
	print("    -----------------------    ")
	print(" 	  Get your sparkling       ")
	print("      business card ready.     ")
	print("--------------------------------\n")

	# Getting the path of all the icons and template.
	template_dir = Path(__file__).parent / "templates"
	email_icon_path = template_dir / "Email Icon Template.png"
	phone_icon_path = template_dir / "Phone Icon Template.png"
	card_template_path = template_dir / "Business Card Template.jpg"

	# Asking for the inputs
	company = input("What company are you working for?: ")
	name = input("What's your name?: ")
	designation = input("What is your current designation?: ")
	department = input("What department are you working in?: ")
	phone = input("What's your phone number?: ")
	email = input("What's your Email ID?: ")

	# Preparing a while loop to check if the address (Line 1) is below or above 30 characters
	address_loop_one = True

	# Resuming if address is below 30 characters.
	while address_loop_one:
		address_line_1 = input("What's your address? (Line 1) [Max: 30 chars]: ")
		if len(address_line_1) <= 30:
			address_loop_one = False
		else:
			print("Limit the length of the address below 30 characters!")

	# Preparing a while loop to check if the address (Line 2) is below or above 30 characters
	address_loop_two = True

	# Resuming if address is below 30 characters.
	while address_loop_two:
		address_line_2 = input("What's your address? (Line 2) [Max: 30 chars]: ")
		if len(address_line_2) <= 30:
			address_loop_two = False
		else:
			print("Limit the length of the address below 30 characters!")

	# Combing the designation and department inputs with a comma.
	designation_and_department = designation + ", " + department

	# Background of the canvas.
	# Open the background as a new Editor to work on it.
	background = Editor(str(card_template_path))

	# Setting up all the fonts required.
	bold_50 = Font.poppins(variant="bold", size=50)
	regular_40 = Font.poppins(variant="regular", size=40)
	light_25 = Font.poppins(variant="light", size=25)
	bold_35 = Font.poppins(variant="bold", size=35)
	light_15 = Font.poppins(variant="light", size=15)

	# Loading all the images
	phone_icon = Editor(str(phone_icon_path)).resize((50, 50))
	email_icon = Editor(str(email_icon_path)).resize((50, 50))

	# Adding the texts.
	background.text(
		(800, 50), company, font=bold_35, color="#000000", align="right"
	)

	background.text(
		(800, 90), address_line_1, font=light_15, color="#000000", align="right"
	)

	background.text(
		(800, 110), address_line_2, font=light_15, color="#000000", align="right"
	)

	background.text((94, 50), name, font=bold_50, color="#000000")

	background.text(
		(94, 196), designation_and_department, font=light_25, color="#000000"
	)

	# Adding a line for aesthetics.
	background.rectangle((94, 159), width=754, height=3, color="#000000")

	# Adding the phone icon
	background.paste(phone_icon, (94, 267))

	# Adding the phone number as text
	background.text((153, 270), phone, font=regular_40, color="#000000")

	# Adding the email icon
	background.paste(email_icon, (94, 337))

	# Adding the email ID as text
	background.text((153, 344), email, font=regular_40, color="#000000")

	# Asking for the path to save the resulting file.
	path_to_save = input(
		"Where do you want to save the file? (Eg: C:/path/to/save/filename.png) [Note: Relative paths are also allowed]: "
	)
	try:
		background.save(path_to_save)
	except:
		print("You have entered an incorrect path! Try again")
		exit()

# Running the script with the __name__ == "__main__" check.
if __name__ == "__main__":
	main()
