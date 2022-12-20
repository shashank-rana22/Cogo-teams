import React from 'react';
import CargoDetails from './../../../CargoDetails';
import PortDetails from '../../../PortDetails';
import ShipmentDetails from '../ShipmentDetails'
import styles from './styles.module.css'

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