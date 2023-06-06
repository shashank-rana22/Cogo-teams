const getFormattedValues = (values) => {
	let formattedvalues = {};
	Object.keys(values).forEach((value) => {
		if (value === 'type') {
			formattedvalues = { ...formattedvalues, type: undefined };
		} else if (Array.isArray(values[value])) {
			formattedvalues = {
				...formattedvalues,
				[value]: values[value]
					.map((item) => {
						if (item && Object.keys(item).length > 0) {
							if (typeof item === 'string' || typeof item === 'number') {
								return item;
							}
							if (Object.keys(item).includes('remark')) return item.remark;
							return getFormattedValues(item);
						}
						return null;
					})
					.filter((itemVal) => !!itemVal),
			};
		} else if (values[value] && typeof values[value] === 'object') {
			if (value === 'date_range') {
				formattedvalues = {
					...formattedvalues,
					validity_start : values[value].startDate.toString(),
					validity_end   : values[value].endDate.toString(),
				};
			}
			if (values[value] instanceof Date) {
				formattedvalues = {
					...formattedvalues,
					[value]: values[value].toString(),
				};
			} else if ((values[value] || {}).url !== undefined) {
				formattedvalues = {
					...formattedvalues,
					[value]: values[value].url,
					...values[value],
				};
			} else formattedvalues = { ...formattedvalues, ...values[value] };
		} else formattedvalues = { ...formattedvalues, [value]: values[value] };
	});
	return formattedvalues;
};

export default getFormattedValues;
