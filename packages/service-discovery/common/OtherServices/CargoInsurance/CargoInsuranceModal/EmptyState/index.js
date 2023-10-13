import { IcMVerySad } from '@cogoport/icons-react';

import styles from './styles.module.css';

const TEXT_MAPPING = {
	blocked_country:
		'We are sorry , We do not offer insurance for this port pair yet.',
	something_went_wrong:
		'Looks like something went wrong. Please try again later',
	cargo_insurance_not_available_in_this_country:
		'We are sorry , We do not offer insurance for this country',
	own_country_location_not_selected_in_origin_and_destination:
		'We are sorry, We do not offer insurance for these location pairs',
	own_country_location_not_selected_in_origin_or_destination:
		'We are sorry, We do not offer insurance for these port pairs',
};

function EmptyState({ reason = '' }) {
	return (
		<div className={styles.sad_container}>
			<IcMVerySad className={styles.icon} width={40} height={40} />
			<div className={styles.sad_text}>{TEXT_MAPPING[reason] || 'Something went wrong!'}</div>
		</div>
	);
}
export default EmptyState;
