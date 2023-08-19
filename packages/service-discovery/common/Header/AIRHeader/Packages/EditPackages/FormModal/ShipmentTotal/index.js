import roundUp from '../helpers/roundUp';

import styles from './styles.module.css';

const INITIAL_REDUCER_VALUE = 0;

function ShipmentTotal({
	packageQuantity = [],
	packageWeight = [],
	packageVolume = [],
}) {
	const getTotal = (array = []) => {
		const total = array.reduce((accumulator, value) => accumulator + value, INITIAL_REDUCER_VALUE);
		return roundUp(total);
	};

	return (
		<div className={styles.pill_container}>
			<div className={styles.text}>
				{` Shipment total: ${getTotal(packageQuantity)} UNITS, ${getTotal(
					packageWeight,
				)} KG, ${getTotal(packageVolume)} CBM`}
			</div>
		</div>
	);
}

export default ShipmentTotal;
