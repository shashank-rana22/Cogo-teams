import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';

import styles from './styles.module.css';

const geo = getGeoConstants();

function UpdatedAmount({ fundRequests = [], currency = '' }) {
	return (
		<>
			{(fundRequests || []).map(({ createdAt = '', requestedAmount = '', id = '' }) => (
				<div className={styles.sub_container} key={id}>
					<div className={styles.amount_text}>
						{ formatAmount({
							amount  : requestedAmount,
							currency,
							options : {
								style           : 'currency',
								currencyDisplay : 'code',
							},
						})}
					</div>
					<div className={styles.date_time}>
						{formatDate({
							date       : createdAt,
							dateFormat : geo.formats.date.default,
							timeFormat : geo.formats.time['12hrs'],
							formatType : 'dateTime',
						})}
					</div>
				</div>
			))}
		</>
	);
}
export default UpdatedAmount;
