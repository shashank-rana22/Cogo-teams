import { isEmpty } from '@cogoport/utils';
import dynamic from 'next/dynamic';
import React from 'react';

import { HOME_TOUR_STEPS } from '../../constants';

import styles from './styles.module.css';

const Tour = dynamic(
	() => import('reactour'),
	{ ssr: false },
);

function DemoTour({ tour = false, setTour = () => {}, activeShipmentCard = '' }) {
	const getTourSteps = () => {
		if (isEmpty(activeShipmentCard)) {
			return HOME_TOUR_STEPS;
		}
		return [{}]; // this return value should never be the case, it's just to avoid crash
	};
	return (
		<Tour
			steps={getTourSteps()}
			isOpen={tour}
			onRequestClose={() => setTour(false)}
			maskClassName={styles.tour_mask}
			startAt={0}
			closeWithMask={false}
		/>
	);
}

export default DemoTour;
