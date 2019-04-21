const userRoles = {
    ADMIN: 'Admin',
    USER: 'User'
};

const notifTypes = {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info'
};

const movieTypes = {
    ORIGINAL_TRILOGY: 0,
    PREQUEL_TRILOGY: 1,
    SEQUEL_TRILOGY: 2,
    STANDALONE: 3
};

const movieTypesName = {
    0: 'Original trilogy',
    1: 'Prequel trilogy',
    2: 'Sequel trilogy',
    3: 'Standalone movie'
};

const searchSections = {
    0: 'Characters',
    1: 'Weapons',
    2: 'Spaceships',
    3: 'Planets',
    4: 'Movies'
};

export {
    userRoles,
    notifTypes,
    movieTypes,
    movieTypesName,
    searchSections
};
