import React from 'react';

import WARMTH_ACCOUNTS_STATS from '../../../../constants/get-multiple-account-stats';

import styles from './styles.module.css';

function MultipleCheckedAccounts({ modalDetailsArray = [] }) {
	const filteredList = modalDetailsArray.reduce(
		(result, singleAccount) => {
			const { warmth } = singleAccount;
			if (warmth === 'ice_cold') {
				result.ice_cold_accounts.push(singleAccount);
			} else if (warmth === 'cold') {
				result.cold_accounts.push(singleAccount);
			}
			return result;
		},
		{ ice_cold_accounts: [], cold_accounts: [] },
	);

	return (
		<div className={styles.container}>
			You are about to de-allocate
			{' '}
			{modalDetailsArray.length}
			{' '}
			Users.
			Please verify from the list below before de-allocation
			<div className={styles.account_stats}>
				{WARMTH_ACCOUNTS_STATS.map((item) => {
					const { key, label, flex } = item;
					return (
						<div key={key} style={{ flex }}>

							<div className={styles.label}>
								{' '}
								{label}
								{' '}
							</div>

							<div className={styles.value}>{filteredList[key].length}</div>

						</div>
					);
				})}

			</div>

		</div>
	);
}

export default MultipleCheckedAccounts;
