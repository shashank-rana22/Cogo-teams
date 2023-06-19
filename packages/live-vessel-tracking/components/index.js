import dynamic from 'next/dynamic';

import useGetVessel from '../hooks/useGetVessel';

import styles from './styles.module.css';

const Maps = dynamic(() => import('./Maps'), { ssr: false });

function LiveVesselTracking() {
	const { data = [], loading, setCurrentBound } = useGetVessel();

	return (
		<div className={styles.container}>
			<div className={styles.title}>Live Vessel Tracking</div>
			<div className={styles.map_container}>
				<Maps vesselInfo={data} setCurrentBound={setCurrentBound} />
				{!loading && data.length === 0 && (
					<div className={styles.loader}>
						<div className={styles.loading_text}>No Data Avaliable</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default LiveVesselTracking;
