import { isEmpty } from '@cogoport/utils';

const applyRegEx = (searchString, list, key, aliases = []) => {
	const newSearchString = searchString.toLowerCase();

	const newList = [];

	(list || []).forEach((item) => {
		const already_present = newList.some((listItem) => item.key === listItem.key);

		if (already_present) {
			return;
		}

		const { options = [] } = item;

		const newItem = {
			...item,
			options: isEmpty(options)
				? []
				: options.filter((optionItem) => optionItem.title.toLowerCase()
					.includes(newSearchString)),
		};

		const isAliasPresent = aliases
			.some((alias) => newItem[alias]?.toLowerCase().includes(newSearchString));

		if ((isAliasPresent || !isEmpty(newItem.options) || newItem[key]?.toLowerCase().includes(newSearchString))) {
			newList.push(newItem);
		}
	});

	return newList;
};

export default applyRegEx;
