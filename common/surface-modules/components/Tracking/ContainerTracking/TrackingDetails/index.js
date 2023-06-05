import React, { useState, useEffect } from 'react';
import TrackingInfo from './TrackingInfo';
import LoadingState from './LoadingState';
import EmptyState from './EmptyState';
import TrackingMap from './TrackingMap';
import styles from './styles.module.css';

function TrackingDetails({ list, loading = false }) {
	if (loading) {
		return (
			<div className={styles.container}>
				<LoadingState />
			</div>
		);
	}

	return (
		<div className={styles.tracking_info}>
			{!loading && !list?.list?.length ? (
				<EmptyState />
			) : (
				<TrackingInfo
					data={list?.list}
					tripInfo={list?.tripinfo}
				/>
			)}

			<TrackingMap
				routesLoading={loading}
				points={list?.lat_log}
				destination={list?.destination_location}
			/>
		</div>
	);
}

export default TrackingDetails;
