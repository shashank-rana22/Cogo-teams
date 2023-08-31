import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function WeightSlabs() {
	const handleClick = () => {
		console.log('clicked');
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>WeightSlabs</h1>
			<div className={styles.button_container}>
				<Button
					className={styles.button}
					onClick={handleClick}
				>
					Create New Weight Slab
				</Button>
			</div>
		</div>
	);
}

export default WeightSlabs;
