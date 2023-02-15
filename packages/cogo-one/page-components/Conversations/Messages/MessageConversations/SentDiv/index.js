/* eslint-disable max-len */
import styles from './styles.module.css';

function SentDiv() {
	return (
		<div className={styles.container}>
			<div className={styles.message_div}>
				<div className={styles.name}>
					Replied by Kam 2,
					<span className={styles.time_stamp}>11:19</span>
				</div>
				<div className={styles.receive_message_container}>
					Hello, I am calling to take confirmation of
					my shipment details.
				</div>
			</div>
			<img src="https://cogoport-testing.sgp1.digitaloceanspaces.com/10118f395f681ff8ce69dc191c28d45d/XMLID_816_.svg" alt="KAM" />
		</div>
	);
}
export default SentDiv;
