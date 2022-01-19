from PIL import Image

from BinaryPFP.src.pos import *

class ImageMaker:
    """
    This is a class for making Binary PFPs.

    Attributes:
        color (str): The color of the PFP.
    """

    def __init__(self):
        """
        Initializes the ImageMaker class.

        Parameters:
            None
        Returns:
            None. Only usable functions.
        """

    def basic_pfp_maker(self, color):
        """
        Makes a 64x64 image using the function in src/pos.py.

        It uses the function in src/pos.py to make a 64x64 image
        of the 64x64 array of 0 and 1 integers. It then converts the
        image to a PIL image and saves it as a PNG file.

        Parameters:
            None

        Returns:
            None, just saves an image.
        """
        
        color = color.lower()
        bg = Image.open('./BinaryPFP/assets/imgs/64-64.png')
        try:
            clr_asset = Image.open('./BinaryPFP/assets/imgs/' + color + '.png')
        except FileNotFoundError as e:
            print(e)
            print('Please enter a valid color.')
            return
        white = Image.open('./BinaryPFP/assets/imgs/white.png')

        positions = create_pos_lists()

        for i in range(len(positions)):
            for j in range(len(positions[i])):
                if positions[i][j] == 1:
                    bg.paste(clr_asset, (j * 8, i * 8))
                else:
                    bg.paste(white, (j * 8, i * 8))

        bg.save('profile.png')

    def alternating_pfp_maker(self, color_1, color_2):
        """
        Makes a 64x64 image using the function in src/pos.py.

        It uses the function in src/pos.py to make a 64x64 image
        of the 64x64 array of 0 and 1 integers. It then converts the
        image to a PIL image and saves it as a PNG file.
        The only exception is that the image doesn't have the same color,
        it has alternating rows of colors.

        Parameters:
            None

        Returns:
            None, just saves an image.
        """

        bg = Image.open('./BinaryPFP/assets/imgs//64-64.png')
        try:
            clr_asset_1 = Image.open('./BinaryPFP/assets/imgs/' + color_1 + '.png')
        except FileNotFoundError as e:
            print(e)
            print('Please enter a valid color.')
            return
        try:
            clr_asset_2 = Image.open('./BinaryPFP/assets/imgs/' + color_2 + '.png')
        except FileNotFoundError as e:
            print(e)
            print('Please enter a valid color.')
            return
        white = Image.open('./BinaryPFP/assets/imgs/white.png')

        positions = create_pos_lists()

        for i in range(len(positions)):
            for j in range(len(positions[i])):
                if i % 2 == 0 and positions[i][j] == 1:
                    bg.paste(clr_asset_1, (j * 8, i * 8))
                elif i % 2 == 0 or positions[i][j] == 1:
                    bg.paste(white, (j * 8, i * 8))
                else:
                    bg.paste(clr_asset_2, (j * 8, i * 8))

        bg.save('profile2.png')

    def rainbow_pfp_maker(self):
        """
        Makes a 64x64 image using the function in src/pos.py.

        It uses the function in src/pos.py to make a 64x64 image
        of the 64x64 array of 0 and 1 integers. It then converts the
        image to a PIL image and saves it as a PNG file.
        The only exception is that the image doesn't have the same color,
        it has alternating rows of colors in a rainbow style.

        Parameters:
            None

        Returns:
            None, just saves an image.
        """

        bg = Image.open('./BinaryPFP/assets/imgs//64-64.png')
        clr_asset_1 = Image.open('./BinaryPFP/assets/imgs/red.png')
        clr_asset_2 = Image.open('./BinaryPFP/assets/imgs/orange.png')
        clr_asset_3 = Image.open('./BinaryPFP/assets/imgs/yellow.png')
        clr_asset_4 = Image.open('./BinaryPFP/assets/imgs/green.png')
        clr_asset_5 = Image.open('./BinaryPFP/assets/imgs/lightblue.png')
        clr_asset_6 = Image.open('./BinaryPFP/assets/imgs/purple.png')
        white = Image.open('./BinaryPFP/assets/imgs/white.png')

        positions = create_pos_lists()

        for i in range(len(positions)):
            for j in range(len(positions[i])):
                if i % 6 == 0 and positions[i][j] == 1:
                    bg.paste(clr_asset_1, (j * 8, i * 8))
                elif i % 6 == 1 and positions[i][j] == 1:
                    bg.paste(clr_asset_2, (j * 8, i * 8))
                elif i % 6 == 2 and positions[i][j] == 1:
                    bg.paste(clr_asset_3, (j * 8, i * 8))
                elif i % 6 == 3 and positions[i][j] == 1:
                    bg.paste(clr_asset_4, (j * 8, i * 8))
                elif i % 6 == 4 and positions[i][j] == 1:
                    bg.paste(clr_asset_5, (j * 8, i * 8))
                elif i % 6 == 5 and positions[i][j] == 1:
                    bg.paste(clr_asset_6, (j * 8, i * 8))
                else:
                    bg.paste(white, (j * 8, i * 8))

        bg.save('profile3.png')