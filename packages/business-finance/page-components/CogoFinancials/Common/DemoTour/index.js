import { isEmpty } from '@cogoport/utils';
import dynamic from 'next/dynamic';
import React from 'react';

import { HOME_TOUR_STEPS } from '../tourSteps';

import styles from './styles.module.css';

const Tour = dynamic(
	() => import('reactour'),
	{ ssr: false },
);

function DemoTour({ tour = false, setTour = () => {}, activeShipmentCard = '' }) {
	return (
		<Tour
			steps={HOME_TOUR_STEPS}
			isOpen={tour && isEmpty(activeShipmentCard)}
			onRequestClose={() => setTour(false)}
			maskClassName={styles.tour_mask}
			startAt={0}
			closeWithMask={false}
		/>
	);
}

export default DemoTour;
