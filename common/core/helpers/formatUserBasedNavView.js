const formatUserBasedNavView = (navList = []) => {
	let totalNav = 0;

	navList.forEach((navItem) => {
		if (navItem?.options) {
			totalNav += navItem.options.length;
		} else {
			totalNav += 1;
		}
	});

	if (totalNav < 10) {
		const newNavList = [];

		navList.forEach((navItem) => {
			if (navItem?.options) {
				navItem.options.forEach((navOption) => {
					newNavList.push({
						...navOption,
						key  : navOption?.key || navItem.key,
						icon : navOption?.icon || navItem.icon,
					});
				});
			} else {
				newNavList.push(navItem);
			}
		});

		return newNavList;
	}

	return navList;
};

export default formatUserBasedNavView;
