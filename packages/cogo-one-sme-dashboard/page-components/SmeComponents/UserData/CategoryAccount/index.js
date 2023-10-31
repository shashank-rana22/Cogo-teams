import { IcMProfile } from '@cogoport/icons-react';
import React from 'react';

import getFormattedAmount from '../../../../utils/getFormattedAmount';

import styles from './styles.module.css';

function CategoryAccount({
	label = '',
	type = '',
	cardData = {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.label}>
				<IcMProfile className={styles.profile_icon} />
				{label}
			</div>

			<div className={styles.type_of}>
				<div className={styles.account_type}>
					Total Accounts
				</div>

				<div className={styles.value}>
					{getFormattedAmount({ number: cardData?.[type]?.total_accounts })}
				</div>
			</div>

			<div className={styles.type_of}>
				<div className={styles.account_type}>
					KYC verified
				</div>

				<div className={styles.value}>
					{getFormattedAmount({ number: cardData?.[type]?.kyc_verified })}
				</div>
			</div>

			<div className={styles.type_of}>
				<div className={styles.account_type}>
					Transacting
				</div>

				<div className={styles.value}>
					{getFormattedAmount({ number: cardData?.[type]?.transacting })}
				</div>
			</div>
		</div>
	);
}

export default CategoryAccount;
