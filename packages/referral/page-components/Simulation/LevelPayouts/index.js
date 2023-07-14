import { cl, Placeholder } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import useGetSimulation from '../../../hooks/useGetSimulation';
import styles from '../styles.module.css';

const PLACEHOLDER_COUNT = 14;
const MAX_DECIMAL_VALUE = 2;

function LevelPayouts({ singleData = {}, activeTab = '' }) {
	const geo = getGeoConstants();
	const currencyCode = geo.country.currency.code;

	const { data = {}, loading } = useGetSimulation({
		type: 'level_data',
		singleData,
		activeTab,
	});

	const levelData = data?.data?.detail;

	const totalPayouts = singleData?.cell?.label;

	const hasLevelEmptyState = isEmpty(levelData);

	if (loading) {
		return (
			<div>
				<div className={styles.networks_chart}>
					{[...Array(PLACEHOLDER_COUNT).keys()].map((itm) => (
						<Placeholder className={styles.networks_skeleton} key={itm} />
					))}
				</div>
			</div>
		);
	}

	if (hasLevelEmptyState) {
		return (
			<div className={cl`${styles.empty_state} `}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.empty_image}
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
				{Object.entries(levelData || {}).map(([key, value]) => (
					<div className={styles.payouts} key={key}>
						<div className={`${styles.single_payouts} ${styles.network_level}`}>
							{key}
						</div>
						<div className={`${styles.single_payouts} ${styles.payouts_level}`}>
							{value.toFixed(MAX_DECIMAL_VALUE)}
						</div>
					</div>
				))}
			</div>

			{!hasLevelEmptyState && (
				<div className={styles.total_payouts}>
					Total Payout:
					<div className={styles.amount}>
						{formatAmount({
							amount   : totalPayouts,
							currency : currencyCode,
							options  : {
								style           : 'currency',
								currencyDisplay : 'code',

							},
						})}

					</div>
				</div>
			)}
		</>
	);
}

export default LevelPayouts;
