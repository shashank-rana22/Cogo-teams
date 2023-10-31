import { startCase } from '@cogoport/utils';
import React from 'react';

import getFormattedAmount from '../../../utils/getFormattedAmount';

import CategoryAccount from './CategoryAccount';
import styles from './styles.module.css';

const DATA = {
	total_accounts              : 392056,
	total_unverified_accounts   : 2917,
	unverified_whatsapp_numbers : 27836,
	unverified_mobile_numbers   : 3719,
	unverified_email_ids        : 12345,
	allocated                   : {
		total_accounts : 7240,
		kyc_verified   : 5923,
		transacting    : 3589,
	},
	unallocated: {
		total_accounts : 23240,
		kyc_verified   : 13923,
		transacting    : 9589,
	},
};

const CATEGORIES = {
	allocated   : 'Allocated Accounts',
	unallocated : 'Un-Allocated Accounts',
};

const UNVERIFIED_TYPES = {
	whatsapp       : 'unverified_whatsapp_numbers',
	mobile_numbers : 'unverified_mobile_numbers',
	email_id       : 'unverified_email_ids',
};

function UserData() {
	return (
		<div className={styles.container}>
			<div className={styles.total_accounts}>
				Total Accounts -
				<span>
					{getFormattedAmount({ number: DATA?.total_accounts })}
				</span>
			</div>

			<div className={styles.category_accounts}>
				{Object.entries(CATEGORIES).map(
					([name, label]) => (
						<CategoryAccount
							key={name}
							type={name}
							cardData={DATA}
							label={label}
						/>
					),
				)}
			</div>

			<div className={styles.unverified_accounts}>
				<div className={styles.total_accounts}>
					Total Un-verified Users -
					<span>
						{getFormattedAmount({ number: DATA?.total_unverified_accounts })}
					</span>
				</div>

				<div className={styles.categorize_accounts}>
					{Object.entries(UNVERIFIED_TYPES).map(
						([name, valueKey]) => (
							<div
								key={name}
								className={styles.unverified}
							>
								<div className={styles.unverified_label}>
									Un-verified
									<div>{startCase(name)}</div>
								</div>
								<div className={styles.count}>
									{getFormattedAmount({ number: DATA?.[valueKey] })}
								</div>
							</div>
						),
					)}
				</div>
			</div>
		</div>
	);
}

export default UserData;
