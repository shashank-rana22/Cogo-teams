import React, { useState, useEffect } from 'react';

import useOceanRoute from '../../../../../hooks/useOceanRoute';

import EmptyState from './EmptyState';
import LoadingState from './LoadingState';
import styles from './styles.module.css';
import TrackingData from './TrackingData';
import TrackingMap from './TrackingMap';

function Body({ list = [], loading = false, shipmentType = '' }) {
	const [oceanPoints, setOceanPoints] = useState([]);
	const [mapPoints, setMapPoints] = useState([]);

	const listToRender = list?.[0]?.data?.[0]?.tracking_data;

	const { routesLoading } = useOceanRoute({
		setMapPoints,
		list: list?.[0],
	});

	useEffect(() => {
		if (mapPoints?.length) {
			setOceanPoints(
				mapPoints.find((x) => x.container_no === list?.[0]?.input)?.route,
			);
		}
	}, [list, mapPoints]);

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
					shippingLine={list?.[0]?.shipping_line}
				/>
			)}
			<TrackingMap
				routesLoading={routesLoading}
				points={oceanPoints}
				shipmentType={shipmentType}
			/>
		</div>
	);
}

export default Body;
