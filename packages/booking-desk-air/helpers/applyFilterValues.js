export const applyFilterValues = ({
	filter = {},
	prevServiceActiveTab = 'air_freight_service',
	setValue = () => {},
}) => {
	Object.keys(filter || {}).forEach((item) => {
		if (item !== prevServiceActiveTab) {
			setValue(item, filter?.[item]);
		} else {
			Object.keys(filter[item] || {}).forEach((itm) => {
				setValue(itm, filter?.[item]?.[itm]);
			});
		}
	});
};
