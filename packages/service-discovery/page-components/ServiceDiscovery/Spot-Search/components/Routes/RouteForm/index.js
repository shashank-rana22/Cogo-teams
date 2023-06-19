import { AsyncSelect } from '@cogoport/forms';
// import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
// import getCountryDetails from '@cogoport/globalization/utils/getCountryDetails';

import getFormControls from './getControls';
import styles from './styles.module.css';

const singleLocationServices = ['fcl_freight_local'];

// const { IN: INDIA_COUNTRY_ID } = GLOBAL_CONSTANTS.country_entity_ids;

const LABEL_MAPPING = {
	fcl_freight: {
		origin      : 'Origin Point',
		destination : 'Destination Point',
	},
	lcl_freight: {
		origin      : 'Origin Point',
		destination : 'Destination Point',
	},
	air_freight: {
		origin      : 'Origin Point',
		destination : 'Destination Point',
	},
	ftl_freight: {
		origin      : 'Origin Point',
		destination : 'Destination Point',
	},
	ltl_freight: {
		origin      : 'Origin Point',
		destination : 'Destination Point',
	},
	trailer_freight: {
		origin      : 'Origin Point',
		destination : 'Destination Point',
	},
	haulage_freight: {
		origin      : 'Origin Point',
		destination : 'Destination Point',
	},
};

function RouteForm({ mode = {}, setLocation, location }) {
	// const INDIA_COUNTRY_CODE = getCountryDetails({
	// 	country_id: INDIA_COUNTRY_ID,
	// })?.country_code;

	const label = LABEL_MAPPING[mode.mode_value];

	const { origin, destination } = label;

	const [originControls, destinationControls] = getFormControls({ mode: mode.mode_value });

	// useEffect(() => {
	// 	if (isEmpty(location.origin) && isEmpty(location.destination)) {
	// 		return;
	// 	}
	// 	let object = location;
	// 	if (location.destination.country_code === INDIA_COUNTRY_CODE) {
	// 		object = { ...object, serviceType: 'import' };
	// 	} else {
	// 		object = { ...object, serviceType: 'export' };
	// 	}

	// 	setLocation(object);
	// }, [INDIA_COUNTRY_CODE, location, setLocation]);

	if (singleLocationServices.includes[mode?.mode_value]) {
		// Single Location Here
	}

	return (
		<div className={styles.container}>
			<div className={styles.form_item}>
				<div className={styles.label}>
					{origin || ''}
					{' '}
					<div className={styles.required_mark}>*</div>
				</div>

				{/* <LocationSelect
							{...controlItem}
							name={name}
							label={label}
							control={control}
							role="button"
							aria-label="input"
							caret={false}
							handleChange={(obj) => {
								setLocation((pv) => ({
									...pv,
									origin: obj,
								}));
							}}
						/> */}

				<AsyncSelect
					{...originControls}
					value={location?.origin}
					onChange={(val) => setLocation((prev) => ({ ...prev, origin: val }))}
				/>

			</div>

			<div className={styles.form_item}>
				<div className={styles.label}>
					{destination || ''}
					{' '}
					<div className={styles.required_mark}>*</div>
				</div>

				<AsyncSelect
					{...destinationControls}
					value={location?.destination}
					onChange={(val) => setLocation((prev) => ({ ...prev, destination: val }))}
				/>

			</div>

		</div>
	);
}

export default RouteForm;
