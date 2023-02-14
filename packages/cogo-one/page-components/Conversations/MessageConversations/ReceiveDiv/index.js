import styles from './styles.module.css';

function ReceiveDiv({ eachMessage = {} }) {
	const { name = '', time = '', message = '' } =	eachMessage || {};
	return (
		<div className={styles.container}>
			<div className={styles.name}>
				{name}
				,
				<span className={styles.time_stamp}>{time}</span>
			</div>
			<div className={styles.receive_message_container}>
				{message}
			</div>
		</div>
	);
}
export default ReceiveDiv;
