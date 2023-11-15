import { cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { LoadingState } from '../../../common/Elements';
import useSmeDashboardStats from '../../../hooks/useSmeDashboardStats';
import getFormattedAmount from '../../../utils/getFormattedAmount';

import CategoryAccount from './CategoryAccount';
import styles from './styles.module.css';

const CATEGORIES = {
	allocated   : 'Allocated Accounts',
	unallocated : 'Un-Allocated Accounts',
};

const UNVERIFIED_TYPES = {
	whatsapp       : 'total_whatsapp_unverified',
	mobile_numbers : 'total_mobile_unverified',
	email_id       : 'total_email_unverified',
};

function UserData({ widgetBlocks = null, filterParams = {} }) {
	const {
		dashboardData = {},
		dashboardLoading = false,
	} = useSmeDashboardStats({
		widgetBlocks,
		filterParams,
	});

	const { accounts_data: accountsData = {} } = dashboardData || {};

	if (dashboardLoading) {
		return (
			<div className={cl`${styles.container} ${styles.loading_container}`}>
				<LoadingState />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.total_accounts}>
				Total Accounts -
				<span>
					{getFormattedAmount({ number: accountsData?.total_count })}
				</span>
			</div>

			<div className={styles.category_accounts}>
				{Object.entries(CATEGORIES).map(
					([name, label]) => (
						<CategoryAccount
							key={name}
							type={name}
							cardData={accountsData}
							label={label}
						/>
					),
				)}
			</div>

			<div className={styles.unverified_accounts}>
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
									{getFormattedAmount({ number: accountsData?.[valueKey] })}
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
