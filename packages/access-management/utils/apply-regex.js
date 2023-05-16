import { isEmpty } from '@cogoport/utils';

const applyRegEx = (searchString, list, key, aliases = []) => {
	const newSearchString = searchString.toLowerCase();

	const newList = [];

	(list || []).forEach((item) => {
		let newItem = { ...item };

		const { options = [] } = newItem;

		const already_present = newList.some((listItem) => item.key === listItem.key);

		const newOptions = [];
		if (!isEmpty(options)) {
			(options || []).forEach((optionItem) => {
				if (optionItem.title.toLowerCase().includes(newSearchString)) {
					newOptions.push(optionItem);
				}
			});
		}

		if (!isEmpty(newOptions)) {
			newItem = { ...item, options: newOptions };
		}

		const isPresentInAlias = (aliases || [])
			.some((alias) => newItem[alias] && newItem[alias].toLowerCase().includes(newSearchString));

		if (!already_present
			&& (isPresentInAlias || !isEmpty(newOptions) || newItem[key].toLowerCase().includes(newSearchString))) {
			newList.push(newItem);
		}
	});

	return newList;
};

export default applyRegEx;
