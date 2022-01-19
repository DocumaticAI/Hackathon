from BinaryPFP.src.funcs import ImageMaker

color = input("What do you want as the first color?\n\t>>> ")
color2 = input("What do you want as the second color?\n\t>>> ")

avatar = ImageMaker()
avatar.basic_pfp_maker(color=color)
avatar.alternating_pfp_maker(color_1=color, color_2=color2)
avatar.rainbow_pfp_maker()

print("PFP made!")