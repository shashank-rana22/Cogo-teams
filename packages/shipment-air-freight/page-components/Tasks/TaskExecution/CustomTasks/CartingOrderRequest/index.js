import styles from './styles.module.css';

function CartingOrderRequest({
	shipmentData = {},
	task = {},
	refetch = () => {},
	onCancel = () => {},
}) {
	console.log('onCancel:', onCancel);
	console.log('refetch:', refetch);
	console.log('shipmentData:', shipmentData);
	console.log('task:', task);
	return (
		<div className={styles.main_container}>
			<div className={styles.heading}>Add Vehicle Arrivals Slots</div>
		</div>
	);
}

export default CartingOrderRequest;
