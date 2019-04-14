const errorNotifs = {
    SOMETHING_WENT_WRONG: 'Something went wrong, please try again',
    USERNAME_SHOULD_BE_ATLEAST_3_CHARACTERS_LONG: 'Username should be atleast 3 characters long',
    PASSWORD_SHOULD_BE_ATLEAST_6_CHARACTERS_LONG: 'Password should be atleast 6 characters long',
    PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
    CHARACTER_NAME_TOO_SHORT: 'Character name should be atleast 2 characters long',
    SEX_IS_REQUIRED: 'You should fill the sex of your character',
    SHORT_STORY_TOO_SHORT: 'Short story should be atleast 30 characters long',
    IMAGE_IS_REQUIRED: 'You should fill atleast one image',
    INVALID_CHARACTER: 'Character does not exist',
    CHARACTER_ALREADY_ADDED: 'You have added already this character',
    WEAPON_NAME_TOO_SHORT: 'Weapon name should be atleast 3 characters long',
    WEAPON_INFO_TOO_SHORT: 'Weapon info should be atleast 10 characters long',
    PLANET_NAME_TOO_SHORT: 'Planet name should be atleast 3 characters long',
    PLANET_INFO_TOO_SHORT: 'Planet info should be atleast 10 characters long',
    SPACESHIP_NAME_TOO_SHORT: 'Spaceship name should be atleast 3 characters long',
    SPACESHIP_INFO_TOO_SHORT: 'Spaceship info should be atleast 10 characters long',
    SPACESHIP_DIMENSION_REQUIRED: 'Dimension is required field',
    MOVIE_NAME_TOO_SHORT: 'Movie name should be atleast 5 characters long',
    MOVIE_TYPE_REQUIRED: 'Please choose the trilogy of the movie',
    MOVIE_RELEASE_DATE_REQUIRED: 'Please provide a release date',
    MOVIE_INFO_TOO_SHORT: 'Movie info should be atleast 30 characters long',
    MOVIE_COVER_REQUIRED: 'Please provide a cover',
    INVALID_DATE: 'Invalid date',
    SEARCH_UNREACHABLE: 'Search bar is not working in the moment, please try to use it later.'
};

const successNotifs = {
    LOGOUT_SUCCESSFULL: 'Logout successfull'
};

const infoNotifs = {
    AFFILATION_ADDED: 'Affilation already added.',
    AFFILATION_NOT_IN_COLLECTION: 'Affilation not included in the list',
    IMAGE_ADDED: 'Image already added.',
    IMAGE_NOT_IN_COLLECTION: 'Image not included in the list',
    OWNER_ADDED: 'Owner already added.',
    OWNER_NOT_IN_COLLECTION: 'Owner not included in the list'
};

const warningNotifs = {
    INVALID_CHARACTER: 'Character does not exist'
};

export {
    errorNotifs,
    successNotifs,
    infoNotifs,
    warningNotifs
};