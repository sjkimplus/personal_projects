import { createContext, useState } from "react";


export const FavoritesContext = createContext({
	ids: [],
	addFavorite: (id) => {},
	removeFavorite: (id) => {},
});

function FavoritesContextProvider({children}) {
	const [favoriteMealIds, setFavoriteMealIds] = useState([]);

	function addFavorite(id) {
		setFavoriteMealIds((currentFavIds) => [...currentFavIds, id])
	}

	function removeFavorite(id) {
		setFavoriteMealIds((currentFavIds) => currentFavIds.filter((favMeal) => favMeal !== id))
	}

	const value = { // can use in other files
		ids: favoriteMealIds,
		addFavorite: addFavorite,
		removeFavorite: removeFavorite
	};

	return (
	<FavoritesContext.Provider value={value}>
		{children}
	</FavoritesContext.Provider>);
}

export default FavoritesContextProvider;



