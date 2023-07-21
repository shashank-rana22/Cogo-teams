import React, { useMemo } from 'react';

import OfferBundle from './OfferBundle';
import { sampleData } from './sampleData';
import styles from './styles.module.css';

const RANDOM_THRESHOLD_VALUE = 0.5;

function shuffleArray(array) {
	return array.sort(() => Math.random() - RANDOM_THRESHOLD_VALUE);
}

function Bundles() {
	const shuffledArray = useMemo(() => shuffleArray(sampleData), []);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Pre-curated Offers (Coming Soon)</div>

			{shuffledArray.map((item) => (
				<OfferBundle key={item.key} data={item} />
			))}
		</div>
	);
}

export default Bundles;
