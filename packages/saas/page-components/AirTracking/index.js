import { Button } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function AirTracking() {
	const [airTrackers, setAirTrackers] = useState({});
	const [isMobile, setIsMobile] = useState(false);
	const [isMapView, setMapView] = useState(false);

	console.log(airTrackers, isMobile, isMapView, setMapView, setAirTrackers, setIsMobile);

	return (
		<div className={styles.container}>
			<header className={styles.heading_container}>
				<h1>Air Cargo Tracking</h1>

				<div
					className={styles.button_container}
					{...{ 'data-instructional-pre-overlay-step': '4' }}
					{...{ 'data-instructional-overlay-step': '4' }}
				>
					<Button
						size="lg"
						id="air_trackers_create_new_tracker_btn"
					>
						<IcMPlus style={{ marginRight: 4 }} />
						Create New Tracker
					</Button>
				</div>
			</header>
		</div>
	);
}

export default AirTracking;
