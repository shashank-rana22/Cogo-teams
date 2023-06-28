import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles.module.css';

const geo = getGeoConstants();

const CustomerInformation = ({ data }) => {
	const { customerDetails } = data || {};

	return (customerDetails || []).map((item) => {
		const {
			id,
			customerName,
			customerOutstandingAmount,
			customerOutstandingAmountOnSid,
		} = item || {};

		return (
			<div className={styles.container} key={id}>
				<div className={styles.subcontainer}>
					Name -
					{' '}
					<span style={{ fontWeight: 600 }}>{customerName}</span>
				</div>

				<div className={styles.subcontainer}>
					Total Outstanding -
					<span style={{ fontWeight: 600 }}>
						{formatAmount({
							amount   : customerOutstandingAmount,
							currency : geo.country.currency.code,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 0,
							},
						})}
					</span>
				</div>

				<div className={styles.subcontainer}>
					On Account Payments -
					<span style={{ fontWeight: 600 }}>
						{formatAmount({
							amount   : customerOutstandingAmountOnSid,
							currency : geo.country.currency.code,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 0,
							},
						})}
					</span>
				</div>
			</div>
		);
	});
};
export default CustomerInformation;
