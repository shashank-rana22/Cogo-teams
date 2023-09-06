import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import styles from './styles.module.css';

function BasicDetails({ tradePartyDetails = {} }) {
	const { legal_business_name, registration_number, serial_id, updated_at } =		tradePartyDetails.tradePartyDetails;

	return (
		<div className={styles.container}>
			<div className={styles.sub_container}>
				<div className={styles.heading}>{legal_business_name}</div>

				<div className={styles.serial_id}>
					ID #
					{serial_id}
				</div>
			</div>

			<div className={styles.sub_container}>
				<div className={styles.registration_number}>
					{registration_number}
				</div>
			</div>

			<div className={`${styles.sub_container} ${styles.no_border}`}>
				<div className={styles.registration_number}>
					Last Updated On:
					{formatDate({
						date       : updated_at,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})}
				</div>
			</div>
		</div>
	);
}
export default BasicDetails;
