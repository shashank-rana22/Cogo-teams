/* eslint-disable max-len */
import styles from './styles.module.css';

function SentDiv({ eachMessage = {} }) {
	const { name = '', time = '', response:{ message = '' } = {} } =	eachMessage || {};
	return (
		<div className={styles.container}>
			<div className={styles.message_div}>
				<div className={styles.name}>
					{name}
					,
					<span className={styles.time_stamp}>{time}</span>
				</div>
				<div className={styles.receive_message_container}>
					{message}
				</div>
			</div>
			<img src="https://cogoport-testing.sgp1.digitaloceanspaces.com/10118f395f681ff8ce69dc191c28d45d/XMLID_816_.svg" alt="KAM" />
		</div>
	);
}
export default SentDiv;
