import { Pill, cl, Loader } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function BasicDetails({ tradePartyDetails = {}, loading = false }) {
	const {
		legal_business_name = '',
		registration_number = '',
		serial_id = '',
		updated_at = '',
	} =	(tradePartyDetails?.tradePartyDetails || {});

	if (loading) return <Loader themeType="primary" />;
	return (
		<div className={styles.container}>
			<div className={styles.heading_serial_id}>
				<div className={styles.heading}>{startCase(legal_business_name)}</div>

				<Pill className={styles.serial_id}>
					ID #
					{serial_id}
				</Pill>
			</div>

			<div className={cl`${styles.registration_number} ${styles.sub_container}`}>
				{registration_number}
			</div>
			<div className={cl`${styles.no_border} ${styles.no_border} ${styles.registration_number}`}>
				Last Updated On:
				{' '}
				{formatDate({
					date       : updated_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				})}
			</div>
		</div>
	);
}
export default BasicDetails;
