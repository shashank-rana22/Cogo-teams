import { useContext } from 'react';

import CONTROL_CONFIG from '../../config/CONTROLS_CONFIG.json';
import CostBookingDeskContext from '../../context/CostBookingDeskContext';

import Child from './Child';
import styles from './styles.module.css';

function Stepper() {
	const { shipmentType } = useContext(CostBookingDeskContext);

	const tabs = CONTROL_CONFIG.shipment_types;
	const onChange = () => {};

	return (
		<div className={styles.container}>
			{tabs?.map((tab) => (
				<Child item={tab} value={shipmentType} onChange={onChange} />
			))}
		</div>
	);
}

export default Stepper;
