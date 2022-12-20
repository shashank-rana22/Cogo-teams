import React from 'react';
import CargoDetails from './../../../CargoDetails';
import ShipmentDetails from '../ShipmentDetails'
import styles from './styles.module.css';
import PortDetails from '../PortDetails';

const Body = ({ data = {} }) => {
	return (
		<div className={styles.container}>
			<PortDetails data={data} />
			<div className={styles.line} />

			<ShipmentDetails data={data} />
			<div className={styles.line}/>

			<div className={styles.cargoContainer}>
				<CargoDetails data={data} />
        	</div>
		</div>
	);
};

export default Body;