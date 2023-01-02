const getChoosenPrefrences = ({ data = [] }) => {
	const exitsingRatePrefrences = [];
	let allBnSalvage = 0;
	(data || []).forEach((element) => {
		if (element?.source === 'bn_salvage') {
			allBnSalvage += 1;
		}
	});
	const flashRatesPrefrences = new Array(
		(data || []).length - allBnSalvage > 1 ? (data || []).length - allBnSalvage - 1 : 0,
	);

	(data || []).forEach((element) => {
		const keys = Object.keys(element);
		const row = {};
		if (keys.includes('ids')) {
			let stringId = '';
			(element.ids || []).forEach((id, index) => {
				if (index === 0) {
					stringId += id;
				} else {
					stringId += `:${id}`;
				}
			});
			row.id = stringId;
			exitsingRatePrefrences.push(row);
		}
		if (keys.includes('id') && keys.includes('source')) {
			if (element?.type === 'single') {
				row.id = element?.id;
				exitsingRatePrefrences.push(row);
			}
			if (element?.source === 'system_rate') {
				row.id = element?.rate_id;
				flashRatesPrefrences[(element?.priority || 0) - 1] = row;
			}
			if (element?.source === 'flash_booking') {
				row.id = element?.rate_id;
				flashRatesPrefrences[(element?.priority || 0) - 1] = row;
			}
		}
	});
	return { bnSalvage: exitsingRatePrefrences, flash: flashRatesPrefrences };
};

export default getChoosenPrefrences;
