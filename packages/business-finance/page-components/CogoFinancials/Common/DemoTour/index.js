import dynamic from 'next/dynamic';
import React from 'react';

import { TOUR_STEPS } from '../../constants';

import styles from './styles.module.css';

const Tour = dynamic(
	() => import('reactour'),
	{ ssr: false },
);

function DemoTour({ tour = false, setTour = () => {} }) {
	return (
		<Tour
			steps={TOUR_STEPS}
			isOpen={tour}
			onRequestClose={() => setTour(false)}
			maskClassName={styles.tour_mask}
		/>
	);
}

export default DemoTour;
