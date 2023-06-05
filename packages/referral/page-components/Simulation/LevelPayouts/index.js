import { cl, Placeholder } from '@cogoport/components';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import { NETWORK_EMPTY_STATE } from '../../../constants';
import useGetSimulation from '../../../hooks/useGetSimulation';
import styles from '../styles.module.css';

function LevelPayouts({ singleData = {}, activeTab = '' }) {
	const { data = {}, loading } = useGetSimulation({ type: 'level_data', singleData, activeTab });

	const levelData = data?.data?.detail;

	const totalPayouts = singleData?.item?.label;

	const checkLevelEmptyState = isEmpty(levelData);

	if (loading) {
		return (
			<div>
				<div className={styles.networks_chart}>
					{[...Array(14)].map((itm) => (
						<Placeholder
							className={styles.networks_skeleton}
							key={itm}
						/>
					))}
				</div>
			</div>
		);
	}

	if (checkLevelEmptyState) {
		return (
			<div className={cl`${styles.empty_state} `}>
				<Image
					src={NETWORK_EMPTY_STATE}
					alt="empty-state"
					width={150}
					height={150}
				/>
			</div>
		);
	}
	return (
		<>
			<div className={styles.user_lavel_payouts}>
				{
    Object.entries(levelData || {}).map(([key, value]) => (
	<div className={styles.payouts} key={key}>
		<div className={`${styles.single_payouts} ${styles.network_level}`}>{key}</div>
		<div className={`${styles.single_payouts} ${styles.payouts_level}`}>{value.toFixed(2)}</div>
	</div>
    ))
  }

			</div>

			{!checkLevelEmptyState && (
				<div className={styles.total_payouts}>
					Total Payout:
					<div className={styles.amount}>
						INR
						{' '}
						{totalPayouts}
					</div>
				</div>
			)}

		</>
	);
}

export default LevelPayouts;
