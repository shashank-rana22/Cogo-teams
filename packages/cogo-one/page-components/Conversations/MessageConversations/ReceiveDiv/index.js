import styles from './styles.module.css';

function ReceiveDiv() {
	return (
		<div className={styles.container}>
			<div className={styles.name}>
				John Wick,
				<span className={styles.time_stamp}>11:19</span>
			</div>
			<div className={styles.receive_message_container}>
				Hello, I am calling to take confirmation of
				my shipment details.
			</div>
		</div>
	);
}
export default ReceiveDiv;
