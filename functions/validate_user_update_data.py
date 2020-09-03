nameValidCharacters = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',    
    ]

def validateUserUpdateData(biography , first_name , last_name):
    first_name_validated = True
    last_name_validated = True
    email_address_validated = True

    if len(first_name) > 20:
        first_name_validated = False
    if len(last_name) > 20:
        last_name_validated = False

    # Validate Firstname characters
    for letter in first_name:
        if letter not in nameValidCharacters:
            first_name_validated = False

    # Validate Lastname characters    
    for letter in last_name:
        if letter not in nameValidCharacters:
            last_name_validated = False
            break
    
    
    return first_name_validated , last_name_validated

