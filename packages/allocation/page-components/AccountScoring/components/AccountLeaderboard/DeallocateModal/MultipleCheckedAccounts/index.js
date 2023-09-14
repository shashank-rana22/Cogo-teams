import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useTranslation } from 'next-i18next';

import getWarmthAccountStats from '../../../../constants/get-multiple-account-stats';

import styles from './styles.module.css';

function MultipleCheckedAccounts({ modalDetailsArray = [] }) {
	const { t } = useTranslation(['allocation']);

	const warmthAccountStats = getWarmthAccountStats({ t });

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
			{t('allocation:you_are_about_to_deallocate')}
			{' '}
			{modalDetailsArray?.length}
			{' '}
			{t('allocation:users')}
			{t('allocation:please_verify_deallocation_phrase')}
			<div className={styles.account_stats}>
				{(warmthAccountStats || []).map((item) => {
					const { key, label, flex } = item;
					return (
						<div key={key} style={{ flex }}>

							<div className={styles.label}>
								{' '}
								{label}
								{' '}
							</div>

							<div className={styles.value}>
								{filteredList[key]?.length
							|| GLOBAL_CONSTANTS.zeroth_index}

							</div>

						</div>
					);
				})}

			</div>

		</div>
	);
}

export default MultipleCheckedAccounts;
