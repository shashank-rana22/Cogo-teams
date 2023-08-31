import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles.module.css';

const CustomerData = ({ data = {} }) => {
	const { customerDetails = [] } = data || {};
	const geo = getGeoConstants();

	const CURRENCY = geo.country.currency.code;

	const OPTIONS = {
		style                 : 'currency',
		currencyDisplay       : 'code',
		maximumFractionDigits : 0,
	};

	return (customerDetails || []).map((item) => {
		const {
			id = 0,
			customerName = '',
			customerOutstandingAmount = 0,
			customerOutstandingAmountOnSid = 0,
		} = item || {};

		return (
			<div className={styles.container} key={id}>
				<div className={styles.subcontainer}>
					Name -
					{' '}
					<span className={styles.text_container}>{customerName}</span>
				</div>

				<div className={styles.subcontainer}>
					Total Outstanding -
					<span className={styles.text_container}>
						{formatAmount({
							amount   : customerOutstandingAmount,
							currency : CURRENCY,
							options  : OPTIONS,
						})}
					</span>
				</div>

				<div className={styles.subcontainer}>
					On Account Payments -
					<span className={styles.text_container}>
						{formatAmount({
							amount   : customerOutstandingAmountOnSid,
							currency : CURRENCY,
							options  : OPTIONS,
						})}
					</span>
				</div>
			</div>
		);
	});
};
export default CustomerData;
