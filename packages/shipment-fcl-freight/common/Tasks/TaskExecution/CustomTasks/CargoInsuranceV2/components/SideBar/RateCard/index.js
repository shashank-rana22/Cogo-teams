import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { Image } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import INSURANCE_PROVIDER from '../../../constants/insuranceProvider';

import styles from './styles.module.css';

const getFormatedAmount = ({ currency = '', value }) => formatAmount({
	amount  : value,
	currency,
	options : {
		style           : 'currency',
		currencyDisplay : 'code',
	},
});

function RateCard({ rateResponse = [] }) {
	const {
		netCharges = '',
		chargeCurrency = '',
		serviceProvider = '',
		serviceChargeList = [],
	} = rateResponse?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	return (
		<div className={styles.section}>
			<h3>Rate Card</h3>

			<div className={styles.container}>
				<div className={cl`${styles.header} ${styles.flex_box}`}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.insurance_pkg}
						className={styles.pkg_img}
						width={60}
						height={60}
						alt="package"
					/>
					<div className={styles.title_container}>
						<Image
							src={INSURANCE_PROVIDER?.[serviceProvider]}
							width={140}
							height={14}
							alt={serviceProvider}
						/>
						<h3 className={styles.total_price}>
							{getFormatedAmount({ currency: chargeCurrency, value: netCharges })}
						</h3>
					</div>
				</div>

				{serviceChargeList.map((item) => (
					<div key={item?.productCodeId} className={styles.line_item_flex}>
						<span>{startCase(item?.displayName)}</span>

						<span>
							{getFormatedAmount({
								currency : chargeCurrency,
								value    : item?.netCharges,
							})}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

export default RateCard;
