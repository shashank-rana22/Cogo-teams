import { isEmpty } from '@cogoport/utils';

const applyRegEx = (searchString, list, key, aliases = []) => {
	const newSearchString = searchString.toLowerCase();

	const newList = [];

	(list || []).forEach((item) => {
		let newItem = { ...item };

		const { options = [] } = newItem;

		const filteredItem = newList.find((listItem) => item.key === listItem.key);

		let already_present = false;
		if (!isEmpty(filteredItem)) already_present = true;

		let isSubNavPresent = false;
		const newOptions = [];
		if (!isEmpty(options)) {
			(options || []).forEach((optionItem) => {
				if (optionItem.title.toLowerCase().includes(newSearchString)) {
					isSubNavPresent = true;
					newOptions.push(optionItem);
				}
			});
		}

		if (!isEmpty(newOptions)) {
			newItem = { ...item, options: newOptions };
		}

		let isPresentInAlias = false;

		aliases.forEach((alias) => {
			if (newItem[alias] && newItem[alias].toLowerCase().includes(newSearchString)) {
				isPresentInAlias = true;
			}
		});

		if (!already_present
			&& (!!isPresentInAlias || isSubNavPresent || newItem[key].toLowerCase().includes(newSearchString))) {
			newList.push(newItem);
		}
	});

	return newList;
};

export default applyRegEx;
