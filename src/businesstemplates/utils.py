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

from docx import Document
from docx.text.paragraph import Paragraph
from docx.shared import Pt
from docx.oxml.xmlchemy import OxmlElement
from docx.enum.text import WD_ALIGN_PARAGRAPH

def change_text(
	paragraph: Paragraph, text_to_change: str, font_size: int, is_bold: bool = False
) -> None:
	''' Helper function to change text and font size of a paragraph '''

	# Changing the text
	paragraph.text = text_to_change

	# Changing the font size of each of the runs in the paragraph.
	for run in paragraph.runs:
		run.font.size = Pt(font_size)
		run.font.name = "Times New Roman"
		run.bold = is_bold

def find_paragraph(document: Document, text: str) -> Paragraph:
	''' Helper function to find paragraph with text '''

	for para in document.paragraphs:
		if text in para.text:
			return para

def insert_paragraph_after(
	document: Document,
	paragraph: Paragraph,
	font_size: int,
	description: str = None,
) -> Paragraph:
	''' Helper function to insert a paragraph after another paragrapoh '''

	# Adding a new XML paragraph element.
	new_paragraph_element = OxmlElement("w:p")

	# Adding the XML paragraph element after the previous paragraph.
	paragraph._p.addnext(new_paragraph_element)

	# Create a Paragraph instance using the created XML paragraph element and
	# appending it to the parent of the previous paragraph.
	new_paragraph = Paragraph(new_paragraph_element, paragraph._parent)

	# Adding text to the paragraph.
	new_paragraph.add_run(f"• {description} ")

	# Changing the font size of the paragraph text.
	new_paragraph.style.font.size = Pt(font_size)
	new_paragraph.style.font.name = "Times New Roman"

	# Returning the created paragraph
	return new_paragraph
