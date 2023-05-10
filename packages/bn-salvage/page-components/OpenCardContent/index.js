import ShipmentInfo from '../ShipmentInfo';
import Timeline from '../Timeline';

import styles from './styles.module.css';

export default function OpenCardContent({ item }) {
	return (
		<div className={styles.open_card_container}>
			<p>
				Booking No.&nbsp;:&nbsp;
				<span className={styles.booking_no}>{item?.document_number}</span>
			</p>
			<ShipmentInfo item={item} />

			<Timeline item={item} />
		</div>
	);
}
