import { useMemo } from 'react';

import roundUp from '../helpers/roundUp';

import styles from './styles.module.css';

const INITIAL_REDUCER_VALUE = 0;

function ShipmentTotal({
	packageQuantity = [],
	packageWeight = [],
	packageVolume = [],
}) {
	const totalUnits = useMemo(() => {
		const total = packageQuantity.reduce((accumulator, value) => accumulator + value, INITIAL_REDUCER_VALUE);
		return roundUp(total);
	}, [packageQuantity]);

	const totalWeight = useMemo(() => {
		const total = packageWeight.reduce((accumulator, value) => accumulator + value, INITIAL_REDUCER_VALUE);
		return roundUp(total);
	}, [packageWeight]);

	const totalVolume = useMemo(() => {
		const total = packageVolume.reduce((accumulator, value) => accumulator + value, INITIAL_REDUCER_VALUE);
		return roundUp(total);
	}, [packageVolume]);

	return (
		<div className={styles.pill_container}>
			<div className={styles.text}>
				{`Shipment total: ${totalUnits} UNITS, ${totalWeight} KG, ${totalVolume} CBM`}
			</div>
		</div>
	);
}

export default ShipmentTotal;
