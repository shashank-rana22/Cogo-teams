import { IcMVerySad } from '@cogoport/icons-react';

import styles from './styles.module.css';

const TEXT_MAPPING = {
	blocked_country:
		'We are sorry , We do not offer insurance for this port pair yet.',
	CARGO_INSURANCE_NOT_AVIALABLE_IN_YOUR_COUNTRY:
		'We are sorry , We do not offer insurance for this country',
	OWN_COUNTRY_LOCATION_NOT_SELECTED_IN_ORIGIN_AND_DESTINATION:
		'We are sorry, We do not offer insurance for these location pairs',
	OWN_COUNTRY_LOCATION_NOT_SELECTED_IN_ORIGIN_OR_DESTINATION:
		'We are sorry, We do not offer insurance for these port pairs',
};

function EmptyState({ reason = '' }) {
	return (
		<div className={styles.no_support}>
			<div className={styles.sad_container}>
				<IcMVerySad className={styles.icon} width={40} height={40} />
				<div className={styles.sad_text}>{TEXT_MAPPING[reason]}</div>
			</div>
		</div>
	);
}
export default EmptyState;
