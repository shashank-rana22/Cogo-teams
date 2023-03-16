import { useContext } from 'react';

import { ShipmentDetailContext } from '../../../common/context';

import styles from './styles.module.css';

function Timeline() {
	const { shipment_data } = useContext(ShipmentDetailContext);

	console.log(shipment_data);
	return (
		<div className={styles.container}>Timeline</div>
	);
}
export default Timeline;
