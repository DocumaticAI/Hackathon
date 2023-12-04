# businesstemplates Technical Documentation

**Last updated:** 2022-01-19\
_Document generation aided by **Documatic**_

An efficient command line tool to create resumes and business cards on the go!

* [Introduction](#introduction)
* [Code Overview](#code-overview)

## Introduction

This is a technical document detailing
        at a high-level
        what businesstemplates does, how it operates,
        and how it is built.

The outline of this document was generated
        by **Documatic**.
<!---Documatic-section-group: arch-start--->


## Project Architecture


<!---Documatic-section-group: arch-end--->

<!---Documatic-section-group: helloworld-start--->


## Code Overview

The codebase has a flat structure, with 4 code files.
<!---Documatic-section-helloworld: setup-start--->
The codebase is compatible with Python 3.6 and above, because of f-string 3.6 in /home/tom/Documents/documatic/test_projects/Hackathon/src/businesstemplates/resume_generator.py.




<!---Documatic-section-helloworld: setup-end--->
`businesstemplates.resume_generator` has a `__main__` entrypoint, which calls:

* `businesstemplates.resume_generator.main`

`businesstemplates.business_card_generator` has a `__main__` entrypoint, which calls:

* `businesstemplates.business_card_generator.main`


<!---Documatic-section-helloworld: entrypoints-start--->


## Entrypoints

There are 0 source code entrypoints in top-level `__main__`/`__init__` files.


<!---Documatic-section-helloworld: entrypoints-end--->

<!---Documatic-section-group: concept-start--->
## Concepts
<!---Documatic-section-group: concept-end--->

<!---Documatic-section-group: helloworld-end--->

<!---Documatic-section-group: dev-start--->


## Developers
<!---Documatic-section-dev: setup-start--->





<!---Documatic-section-dev: setup-end--->

<!---Documatic-section-dev: ci-start--->
No CI/CD config files were detected.


<!---Documatic-section-dev: ci-end--->

<!---Documatic-section-group: dev-end--->

### **Hackathon/**

<!---Documatic-section-file: src/businesstemplates/resume_generator.py--->

#### resume_generator.py


File has 871 lines added and 127 lines removed
                in the past 4 weeks. ThatGenZGamer48 <thatgenzgamer@gmail.com> is the inferred code owner.


resume_generator.py has 1 functions.

```python
main()

Prepare a nice (custom) ASCII art to show before the start of the inputs.
Does not raise.
The function is complex so cannot be summarised easily.
```

<!---Documatic-section-file: src/businesstemplates/utils.py--->

#### utils.py


File has 76 lines added and 0 lines removed
                in the past 4 weeks. ThatGenZGamer48 <thatgenzgamer@gmail.com> is the inferred code owner.


utils.py has 3 functions.

```python
change_text(paragraph: Paragraph, text_to_change: str, font_size: int, is_bold: bool = False) -> None

This function takes a paragraph and a string of text to change. It then changes the text in the paragraph to the new text. It then loops through each run in the paragraph and sets the font size and font name to the new values. It then sets the bold property to the new value.

Helper function to change text and font size of a paragraph.
Does not raise.
```

```python
find_paragraph(document: Document, text: str) -> Paragraph

Helper function to find paragraph with text.
Does not raise.
```

```python
insert_paragraph_after(document: Document, paragraph: Paragraph, font_size: int, description: str = None,) -> Paragraph

This function inserts a paragraph after the paragraph passed as the first argument.
The font size of the inserted paragraph is the font size of the paragraph passed as the first argument.
The inserted paragraph is a copy of the paragraph passed as the first argument.
The inserted paragraph has a line that

Helper function to insert a paragraph after another paragrapoh.
Does not raise.
```

<!---Documatic-section-file: src/businesstemplates/business_card_generator.py--->

#### business_card_generator.py


File has 148 lines added and 10 lines removed
                in the past 4 weeks. ThatGenZGamer48 <thatgenzgamer@gmail.com> is the inferred code owner.


business_card_generator.py has 1 functions.

```python
main()

Does not raise.
The function is complex so cannot be summarised easily.
```