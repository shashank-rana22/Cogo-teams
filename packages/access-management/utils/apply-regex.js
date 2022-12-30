const applyRegEx = (searchString, list, key, aliases = []) => {
	const newSearchString = searchString.toLowerCase();
	const newList = (list || []).filter((item) => {
		if (item[key].toLowerCase().includes(newSearchString)) {
			return true;
		}

		let isPresentInAlias = false;
		aliases.forEach((alias) => {
			if (item[alias] && item[alias].toLowerCase().includes(newSearchString)) {
				isPresentInAlias = true;
			}
		});

		return !!isPresentInAlias;
	});

	return newList;
};

export default applyRegEx;
