const collectionManager = {
    doAddItem: (item, collection) => {
        if (item) {
            if (collection.includes(item)) {
                return false;
            }
    
            return true;
        }

        return false;
    },

    getItemNameAndId: (itemName, collection) => {
        const item = collection.find(el => el.name === itemName);

        if (item) {
            return {_id: item._id, name: item.name};
        }

        return null;
    },

    getIndexOfItem: (item, collection) => {
        return collection.indexOf(item);
    },

    addItem: (item, collection) => {
        const newCollection = collection.slice();
        newCollection.push(item);
        return newCollection
    },

    removeItem: (index, collection) => {
        const newCollection = collection.slice();
        newCollection.splice(index, 1);
        return newCollection;
    }
};

export default collectionManager;
