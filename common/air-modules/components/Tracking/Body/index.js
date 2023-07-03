import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import useGetAirPoints from '../../../hooks/useGetAirPoints';

import EmptyState from './EmptyState';
import LoadingState from './LoadingState';
import styles from './styles.module.css';
import TrackingData from './TrackingData';
import TrackingMap from './TrackingMap';

function Body({ list = [], loading = false }) {
	const listToRender = list?.data?.[GLOBAL_CONSTANTS.zeroth_index]?.tracking_data;

	const { airPoints, airLoading } = useGetAirPoints({ airTrackerDetails: list });

	if (loading) {
		return (
			<div className={styles.container}>
				<LoadingState />
			</div>
		);
	}

	return (
		<div className={styles.tracking_info}>
			{!loading && !listToRender?.length ? (
				<EmptyState />
			) : (
				<TrackingData
					data={listToRender}
				/>
			)}
			<TrackingMap
				routesLoading={airLoading}
				points={airPoints}
			/>
		</div>
	);
}

export default Body;
