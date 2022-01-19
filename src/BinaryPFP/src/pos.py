import random

def create_pos_lists():
    """
    Makes a 2d array of randomly generated 0 and 1 integers.
    
    It makes and returns a list that has 8 other lists which consist
    of randomy generated 0 and 1 digit numbers. The first four elements
    in the list are a mirror image of the last 4.
    
    Parameters:
        None
    
    Returns:
        2d array of randomly generated 0 and 1 integers
    """

    return [
        (x:=[random.randint(0, 1) for _ in range(4)])+x[::-1] for _ in range(8)
    ]