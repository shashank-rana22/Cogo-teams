import formatDate from '@cogoport/globalization/utils/formatDate';

const DATE_CONTROLS = [
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
	const MAPPED_VALUES = {};
	const controlKeys = Object.keys(keyMappings);

	controlKeys.forEach((ctrl) => {
		const name = keyMappings[ctrl] || ctrl;

		if (typeof name === 'object') {
			const dataValues = rpaData[ctrl] || [];

			const actualData = dataValues.map((item) => {
				const ITEM_VALUES = {};
				const innerKeys = Object.keys(name);

				innerKeys.forEach((key) => {
					const relatedCtrl = name[key];

					if (DATE_CONTROLS.includes(key)) {
						const val = (item[relatedCtrl] || item[key] || '').replace(' ', '');

						if (val) {
							ITEM_VALUES[key] = formatDate({
								date       : val || new Date(),
								formatType : 'date',
							});
						}
					} else {
						ITEM_VALUES[key] = item[relatedCtrl] || item[key] || '';
					}
				});

				return ITEM_VALUES;
			});

			MAPPED_VALUES[ctrl] = actualData;
		} else if (DATE_CONTROLS.includes(ctrl)) {
			const val = (rpaData[name] || rpaData[ctrl] || '').replace(' ', '');
			let dt = null;

			if (val) {
				dt = formatDate({
					date       : val || new Date(),
					formatType : 'date',
				});
			}

			if (dt) {
				MAPPED_VALUES[ctrl] = dt;
			}
		} else {
			MAPPED_VALUES[ctrl] = rpaData[name] || rpaData[ctrl];
		}
	});

	return MAPPED_VALUES;
};

export default mapKeyValues;
