import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Header({ organizationData = {}, subscriptionData = {} }) {
	const { serial_id: serialId = '', business_name: businessName = '' } = organizationData || {};
	const { product_family = {}, pricing = {} } = subscriptionData?.active || {};
	const { name = '', price = 0, currency = '' } = pricing || {};

	return (
		<>
			<div className={styles.section}>
				<div className={styles.section_card}>
					<div className={styles.card_title}>
						Serial Id:
						<span>{serialId}</span>
					</div>
					<div className={styles.card_title}>
						Business Name:
						<span>{businessName}</span>
					</div>
				</div>
				<div className={styles.section_card}>
					<div className={styles.subscription_amount}>
						INR
						<span>
							{formatAmount({
								amount  : price,
								currency,
								options : {
									style                 : 'currency',
									currencyDisplay       : 'symbol',
									compactDisplay        : 'short',
									minimumFractionDigits : 0,
								},
							})}
						</span>
						/month
					</div>
				</div>
			</div>

			<div className={styles.section}>
				<div className={styles.section_card}>
					<div className={styles.card_title}>Plan Details</div>
					<div>{startCase(name) || '-'}</div>
				</div>
				<div className={styles.section_card}>
					<div className={styles.card_title}>Family</div>
					<div>{startCase(product_family?.product_family_name) || '-'}</div>
				</div>
			</div>

			<div className={styles.horizontal_line} />

		</>
	);
}

export default Header;
