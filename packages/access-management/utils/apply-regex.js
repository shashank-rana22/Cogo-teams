import { isEmpty } from '@cogoport/utils';

const applyRegEx = (searchString, list, key, aliases = []) => {
	const newSearchString = searchString.toLowerCase();

	const NEW_LIST = [];

	(list || []).forEach((item) => {
		const already_present = NEW_LIST.some((listItem) => item.key === listItem.key);

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
			NEW_LIST.push(newItem);
		}
	});

	return NEW_LIST;
};

export default applyRegEx;
