import { IcMAirport, IcMLocation, IcMPort } from '@cogoport/icons-react';

import MODES from '../../../configurations/modes.json';

import styles from './styles.module.css';

function LocationOption({ data, returnOnlyIcon = false }) {
	const countryName = (data.country || {}).name;

	// const { keywords } = usei18n();

	let sub = null;
	let IconElemennt = IcMLocation;

	if (data.type === 'seaport' && data.is_icd) {
		sub = countryName ? `${data.port_code}, ${countryName}` : data.port_code;
		IconElemennt = IcMLocation;
	} else if (data.type === 'seaport') {
		sub = countryName ? `${data.port_code}, ${countryName}` : data.port_code;
		IconElemennt = IcMPort;
	} else if (data.type === 'airport') {
		sub = countryName ? `${data.port_code}, ${countryName}` : data.port_code;
		IconElemennt = IcMAirport;
	} else if (data.type === 'pincode') {
		sub = countryName
			? `${data.postal_code}, ${countryName}`
			: data.postal_code;
	} else if (countryName) {
		sub = countryName;
	}

	if (returnOnlyIcon) {
		return IconElemennt;
	}

	return (
		<div className={styles.label_container}>
			<div className={styles.label_icon}><IconElemennt fill="#333333" /></div>

			<div className={styles.name_container}>
				<div className={styles.label_name}>
					{data.name}
				</div>
				{sub && (
					<div className={styles.sub_label}>
						{sub}
					</div>
				)}
			</div>
		</div>
	);
}

const getFormControls = ({ mode = '' }) => {
	let type = [];

	MODES.forEach((modeItem) => {
		if (modeItem.value === mode) type = modeItem.type;
	});

	const controls = [
		{
			name        : 'origin_location_id',
			type        : 'async-select',
			label       : 'Origin Point',
			placeholder : 'City, Port or Pin ',
			asyncKey    : 'list_locations',
			initialCall : false,
			params      : {
				page_limit : 20,
				includes   : { country: true, default_params_required: true },
				filters    : { type, status: 'active' },
			},
			prefix      : <IcMLocation fontSize={16} />,
			isClearable : true,
			rules       : { required: 'Origin is required' },
			renderLabel : (option) => <>{LocationOption({ data: option })}</>,
		},
		{
			name        : 'destination_location_id',
			type        : 'async-select',
			label       : 'Destination Point',
			placeholder : 'City, Port or Pin ',
			asyncKey    : 'list_locations',
			initialCall : false,
			params      : {
				page_limit : 20,
				includes   : { country: true, default_params_required: true },
				filters    : { type, status: 'active' },
			},
			prefix      : <IcMLocation fontSize={16} />,
			isClearable : true,
			rules       : { required: 'Destination is required' },
			renderLabel : (option) => <>{LocationOption({ data: option })}</>,
		},

	];
	return controls;
};

export default getFormControls;
