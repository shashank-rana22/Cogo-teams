import { cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { Image } from '@cogoport/next';
import { useTranslation } from 'next-i18next';

import INSURANCE_PROVIDER from '../../../../constants/insuranceProvider';
import styles from '../styles.module.css';

const getFormatedAmount = ({ currency, value }) => formatAmount({
	amount  : value,
	currency,
	options : {
		style           : 'currency',
		currencyDisplay : 'code',
	},
});

function RateCardInfo({ info = {} }) {
	const { t } = useTranslation(['cargoInsurance']);

	const { netCharges, serviceChargeList = [], currency = '', serviceProvider } = info || {};

	return (
		<div className={styles.info_container}>

			<div className={cl`${styles.flex_box} ${styles.header}`}>
				<div>
					<Image
						src={INSURANCE_PROVIDER?.[serviceProvider]}
						width={140}
						height={15}
						alt={serviceProvider}
					/>
					<p className={styles.sub_title}>
						{t('cargoInsurance:insurance_company')}
					</p>
				</div>

				<div style={{ textAlign: 'right' }}>
					<h3 className={styles.total_price}>
						{getFormatedAmount({ currency, value: netCharges })}
					</h3>
					<p className={styles.sub_title}>{t('cargoInsurance:incl_tax')}</p>
				</div>
			</div>

			<div className={styles.line_items}>
				<div className={cl`${styles.flex_box} ${styles.line_item_header}`}>
					<span>{t('cargoInsurance:rate_col_1')}</span>
					<span>{t('cargoInsurance:rate_col_2')}</span>
				</div>

				{serviceChargeList.map((ele) => (
					<div
						key={ele.productCodeId}
						className={cl`${styles.row} ${styles.flex_box}`}
					>
						<span>{ele.displayName}</span>
						<span>
							{getFormatedAmount({ currency, value: ele?.netCharges })}
						</span>
					</div>
				))}

			</div>
		</div>
	);
}

export default RateCardInfo;
