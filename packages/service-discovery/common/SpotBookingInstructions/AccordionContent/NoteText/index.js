import styles from './styles.module.css';

function NoteText() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>Note regarding Spotline Booking</div>

			<li>
				Please visit the shipping line&rsquo;s website to verify the availability of SpotLine Bookings.
			</li>
			<li>
				Be aware that the pricing for SpotLine bookings is time-sensitive.
				Check the liner&rsquo;s website and provide a quote accordingly.
			</li>
			<li>
				In case of booking cancellation, higher cancellation charges will apply to the customer.
			</li>
			<li>
				Please note that SpotLine bookings are subject to review by the Revenue Desk and the CEO.
			</li>
			<li>
				The expected response time from the Revenue Desk and the
				procurement of Booking Notes from SO1 is approximately 2 hours.
			</li>
		</div>
	);
}

export default NoteText;
