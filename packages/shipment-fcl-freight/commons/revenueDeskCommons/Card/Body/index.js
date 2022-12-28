import React from 'react';

import CargoDetails from '../../../CargoDetails';
import PortDetails from '../PortDetails';
import ShipmentDetails from '../ShipmentDetails';

import styles from './styles.module.css';

function Body({ data = {} }) {
	return (
		<div className={styles.container}>
			<PortDetails data={data} />
			<div className={styles.line} />

			<ShipmentDetails data={data} />
			<div className={styles.line} />

			<div className={styles.cargo_container}>
				<CargoDetails data={data} />
			</div>
		</div>
	);
}

export default Body;
