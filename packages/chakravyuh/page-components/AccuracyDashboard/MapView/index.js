import dynamic from 'next/dynamic';
import React, { useState } from 'react';

import SidePanel from './SidePanel';
import styles from './styles.module.css';

const Map = dynamic(() => import('./Map'), {
	ssr: false,
});

function MapView({ setView = () => {}, backView = '', filters = {}, setFilters = () => {} }) {
	const [isFull, setIsFull] = useState(false);
	const [locationFilters, setLocationFilters] = useState({ origin: null, destination: null });

	return (
		<div className={styles.container}>
			<div className={`${styles.map}`}>
				<Map
					isFull={isFull}
				/>
			</div>
			<SidePanel
				setIsFull={setIsFull}
				isFull={isFull}
				filters={filters}
				setFilters={setFilters}
				setView={setView}
				backView={backView}
				locationFilters={locationFilters}
				setLocationFilters={setLocationFilters}
			/>
		</div>
	);
}

export default MapView;
