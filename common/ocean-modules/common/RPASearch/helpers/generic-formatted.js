import formatDate from '@cogoport/globalization/utils/formatDate';

const date_controls = [
	'schedule_departure',
	'schedule_arrival',
	'vgm_cutoff',
	'si_cutoff',
	'gate_in_cutoff',
	'document_cutoff',
	'bn_expiry',
	'tr_cutoff',
	'carting_cutoff',
	'tax_invoice_date',
	'due_date',
];

const mapKeyValues = ({ keyMappings = {}, rpaData = {} }) => {
	const mappedValues = {};
	const controlKeys = Object.keys(keyMappings);

	controlKeys.forEach((ctrl) => {
		const name = keyMappings[ctrl] || ctrl;

		if (typeof name === 'object') {
			const dataValues = rpaData[ctrl] || [];

			const actualData = dataValues.map((item) => {
				const itemValues = {};
				const innerKeys = Object.keys(name);

				innerKeys.forEach((key) => {
					const relatedCtrl = name[key];

					if (date_controls.includes(key)) {
						const val = (item[name[key]] || item[key] || '').replace(' ', '');

						if (val) {
							itemValues[key] = formatDate({
								date       : val || new Date(),
								formatType : 'date',
							});
						}
					} else {
						itemValues[key] = item[relatedCtrl] || item[key] || '';
					}
				});
				return itemValues;
			});

			mappedValues[ctrl] = actualData;
		} else if (date_controls.includes(ctrl)) {
			const val = (rpaData[name] || rpaData[ctrl] || '').replace(' ', '');
			let dt = null;

			if (val) {
				dt = formatDate({
					date       : val || new Date(),
					formatType : 'date',
				});
			}
			if (dt) {
				mappedValues[ctrl] = dt;
			}
		} else {
			mappedValues[ctrl] = rpaData[name] || rpaData[ctrl];
		}
	});

	return mappedValues;
};

export default mapKeyValues;
