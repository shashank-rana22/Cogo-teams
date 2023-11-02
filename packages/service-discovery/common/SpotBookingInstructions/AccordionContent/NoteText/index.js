import styles from './styles.module.css';

function NoteText() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>Note regarding Spotline Booking</div>

			<li>
				A booking token or an approval from your channel manager will be
				needed for SpotLine Booking
			</li>
			<li>
				A higher cancellation charge will apply on the customer if booking
				gets cancelled
			</li>
			<li>
				SpotLine bookings are under the scrutiny of Revenue Desk and the CEO
			</li>
			<li>
				Check the shipping line&rsquo;s website to confirm if SpotLine
				Bookings are open
			</li>
			<li>
				SpotLine Bookings prices are time sensitive hence, check the prices
				on the shipping line&rsquo;s website and quote a selling price
				accordingly
			</li>
			<li>
				TAT for response from Revenue Desk and Booking Note Procurement from
				SO1 is ~30-45 mins.
			</li>
		</div>
	);
}

export default NoteText;
