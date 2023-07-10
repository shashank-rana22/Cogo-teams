import React from 'react';

import styles from './styles.module.css';

const WARMTH_ACCOUNTS_STATS = [
	{
		key   : 'ice_cold_accounts',
		label : 'Ice Cold',
		flex  : 1,
	},
	{
		key   : 'cold_accounts',
		label : 'Cold',
		flex  : 1,
	},
];

function MultipleCheckedAccounts({ modalDetailsArray }) {
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
							{label ? (
								<div className={styles.label}>
									{' '}
									{label}
									{' '}
								</div>
							) : null}

							<div className={styles.value}>{filteredList[key].length}</div>

						</div>
					);
				})}

			</div>

		</div>
	);
}

export default MultipleCheckedAccounts;
