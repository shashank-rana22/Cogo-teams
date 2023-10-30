import { cl, Tooltip } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMInfo } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const CHARGES = ['Premium', 'Platform Charges', 'Convenience Fee'];
const DEFAULT_AMOUNT = 0;

const geo = getGeoConstants();

const formarAmountData = (amount) => formatAmount({
	amount,
	currency : geo.country.currency.code,
	options  : {
		style                 : 'currency',
		currencyDisplay       : 'symbol',
		maximumFractionDigits : 2,
	},
});

function GetPremiumLineItem({ amount = '', item = '', key = '' }) {
	return (
		<div className={styles.premium_line_item} key={key}>
			<div className={styles.text}>
				{item}
				{item === 'Amount Payable'
					? 						(
						<Tooltip
							interactive
							theme="light"
							content="Exclusive of taxes"
						>
							<IcMInfo className={styles.info_icon} />
						</Tooltip>
					)
					: null}
			</div>
			<div className={cl`${styles.flex_row} ${styles.values}`}>
				<div className={styles.line} />
				{formarAmountData(amount)}
			</div>
		</div>
	);
}

function PremiumRate({ premiumLoading = false, premiumData = {} }) {
	if (premiumLoading) {
		return (
			<div className={cl`${styles.premium_value} ${styles.loading}`}>
				<div className={cl`${styles.text} ${styles.bold}`}>Please wait while we fetch Details!!!!!!</div>
			</div>
		);
	}

	return (
		<div className={styles.premium_value}>
			{isEmpty(premiumData?.serviceChargeList) ? (
				CHARGES.map((item) => (
					<GetPremiumLineItem
						amount={DEFAULT_AMOUNT}
						item={item}
						key={item?.displayName}
					/>
				))
			) : (
				premiumData?.serviceChargeList?.map((item) => (
					<GetPremiumLineItem
						amount={item?.totalCharges}
						item={item?.displayName}
						key={item?.displayName}
					/>
				))
			)}

			<div className={styles.line} />

			<GetPremiumLineItem
				amount={premiumData?.totalCharges}
				item="Amount Payable"
				key=""
			/>
		</div>

	);
}

export default PremiumRate;
