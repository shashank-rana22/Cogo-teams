import { cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const CHARGES = ['Premium', 'Platform Charges', 'Convenience Fee'];

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
			{isEmpty(premiumData?.serviceChargeList)
				? CHARGES.map((item) => (
					<div className={styles.premium_line_item} key={item}>
						<div className={styles.text}>{item}</div>

						<div className={cl`${styles.flex_row} ${styles.values}`}>
							<div className={styles.line} />
							{formatAmount({
								amount   : 0,
								currency : 'INR',
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'symbol',
									maximumFractionDigits : 2,
								},
							})}
						</div>
					</div>
				))
				: null}

			{premiumData?.serviceChargeList?.map((item) => (
				<div className={styles.premium_line_item} key={item?.displayName}>
					<div className={styles.text}>{item?.displayName}</div>

					<div className={cl`${styles.flex_row} ${styles.values}`}>
						<div className={styles.line} />
						{formatAmount({
							amount   : item?.totalCharges,
							currency : 'INR',
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'symbol',
								maximumFractionDigits : 2,
							},
						})}
					</div>
				</div>
			))}

			<div className={styles.line} />
			<div className={styles.premium_line_item}>
				<div className={styles.text}>Amount Payable</div>

				<div className={cl`${styles.flex_row} ${styles.values}`}>
					<div className={styles.line} />
					{formatAmount({
						amount   : premiumData?.totalApplicableCharges,
						currency : 'INR',
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'symbol',
							maximumFractionDigits : 2,
						},
					})}
				</div>
			</div>
		</div>
	);
}

export default PremiumRate;
