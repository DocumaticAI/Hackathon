from setuptools import setup, find_packages

version = ""
with open("VERSION.txt", "r") as version_file:
	version = version_file.read()

with open("README.rst", "r") as fh:
	long_description = fh.read()

with open("requirements.txt", "r") as requirements_file:
	requirements = requirements_file.read().splitlines()

setup(
	name="businesstemplates",
	version=version,
	author="That GenZ Gamer",
	author_email="thatgenzgamer@gmail.com",
	license="MIT",
	description="An efficient command line tool to create resumes and business cards on the go!",
	long_description=long_description,
	long_description_content_type="text/x-rst",
	packages=find_packages(),
	classifiers=[
		"Programming Language :: Python :: 3",
		"License :: OSI Approved :: MIT License",
		"Natural Language :: English",
		"Topic :: Internet",
		"Topic :: Utilities",
		"Typing :: Typed",
		"Operating System :: OS Independent",
	],
	entry_points={
		"console_scripts": [
			"resume_generator=businesstemplates.resume_generator:main",
			"business_card_generator=businesstemplates.business_card_generator:main",
		],
	},
	install_requires=requirements,
	keywords="Resume, Resume Generator, Business Card, Business Template, template, card",
	python_requires=">=3.7",
	include_package_data=True
)
