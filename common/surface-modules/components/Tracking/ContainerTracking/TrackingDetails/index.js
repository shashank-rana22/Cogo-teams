import React, { useState, useEffect } from 'react';
import TrackingInfo from './TrackingInfo';
import LoadingState from './LoadingState';
import EmptyState from './EmptyState';
import TrackingMap from './TrackingMap';
import styles from './styles.module.css';

function TrackingDetails({ list, loading = false }) {
	if (loading) {
		return (
			<div className={styles.Container}>
				<LoadingState />
			</div>
		);
	}

	return (
		<div className={styles.TrackingInfoContainer}>
			{!loading && !list?.list?.length ? (
				<EmptyState />
			) : (
				<TrackingInfo
					data={list?.list}
					shippingLine={list?.[0]?.shipping_line}
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
