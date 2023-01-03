export const applyFilter = (searchString, list, key, aliases = []) => {
	const newSearchString = searchString.toLowerCase();

	const newList = (list || []).filter((item) => {
		if (item[key].toLowerCase().includes(newSearchString)) {
			return true;
		}

		let isPresentInAlias = false;
		(aliases || []).forEach((alias) => {
			if (item[alias] && item[alias].toLowerCase().includes(newSearchString)) {
				isPresentInAlias = true;
			}
		});
		if (isPresentInAlias) {
			return isPresentInAlias;
		}

		const subNavsOptions =			item?.isSubNavs || item?.options?.length ? item?.options : [];
		let isPresentInSubNavs = false;
		(subNavsOptions || []).forEach((nav) => {
			(aliases || []).forEach((alias) => {
				if (nav[alias] && nav[alias].toLowerCase().includes(newSearchString)) {
					isPresentInSubNavs = true;
				}
			});
		});

		return isPresentInSubNavs;
	});

	const final_list = [];
	(newList || []).forEach((element) => {
		const newAliases = [...aliases];
		if (element?.isSubNavs || element?.options?.length) {
			const newOptions = [];
			(element?.options || []).forEach((nav) => {
				let isinAlias = false;
				(newAliases || []).forEach((alias) => {
					if (
						nav[alias]
						&& nav[alias].toLowerCase().includes(newSearchString)
					) {
						isinAlias = true;
					}
				});
				if (isinAlias) {
					newOptions.push(nav);
				}
			});
			final_list.push({ ...element, options: newOptions });
		} else {
			final_list.push(element);
		}
	});

	return final_list;
};
