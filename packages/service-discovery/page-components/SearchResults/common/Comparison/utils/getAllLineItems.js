function getAllLineItems(staticLineItems = {}, dynamicLineItems = {}) {
	const combinedLineItems = Object.keys(staticLineItems).reduce(
		(result, key) => ({ ...result, [key]: [...staticLineItems[key]] }),
		{},
	);

	Object.keys(dynamicLineItems).forEach((shipping_line) => {
		if (combinedLineItems[shipping_line]) {
			combinedLineItems[shipping_line].push(...dynamicLineItems[shipping_line]);
		} else {
			combinedLineItems[shipping_line] = [...dynamicLineItems[shipping_line]];
		}
	});

	return combinedLineItems;
}

export default getAllLineItems;
