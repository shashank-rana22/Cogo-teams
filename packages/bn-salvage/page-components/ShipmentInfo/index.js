import styles from './styles.module.css';

export default function ShipmentInfo() {
	return (
		<div className={styles.container}>
			<div className={styles.port_info}>Origin</div>
			<div>Port Arrow</div>
			<div className={styles.port_info}>Destination</div>

			<div>Commodity</div>
			<div>Yard Details</div>
		</div>
	);
}
