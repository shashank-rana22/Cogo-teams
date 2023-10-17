import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import getStatsMapping from '../../../../../constant/statsMapping';

import styles from './styles.module.css';

function StatsContainer({ stats: statsData = {}, globalFilter = '', setGlobalFilter = () => {} }) {
	const { shipment_status: prevStatus } = globalFilter || {};

	const { t } = useTranslation(['common', 'airOceanTracking']);

	const STATS_MAPPING = useMemo(() => getStatsMapping({ t }), [t]);

	const clickHandler = (key) => {
		if (key === prevStatus) {
			setGlobalFilter((prev) => {
				const { shipment_status, ...rest } = prev;
				return { ...rest };
			});
			return;
		}
		setGlobalFilter((prev) => ({
			...prev,
			shipment_status: key,
		}));
	};

	return (
		<div className={styles.container}>
			{STATS_MAPPING.map((stats) => (
				<div
					key={stats?.dashboardKey}
					className={cl`${styles.card} ${styles?.[stats?.dashboardKey]}
					${prevStatus === stats?.dashboardKey ? styles.selected : ''}`}
					role="presentation"
					onClick={() => clickHandler(stats?.dashboardKey)}
				>
					<div className={styles.icon_container}>
						{stats?.icon}
					</div>

					<div className={styles.info_container}>
						<p className={styles.text}>{stats?.label}</p>
						<p className={styles.num}>
							{statsData?.[stats?.dashboardKey] || GLOBAL_CONSTANTS.zeroth_index}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}
export default StatsContainer;
