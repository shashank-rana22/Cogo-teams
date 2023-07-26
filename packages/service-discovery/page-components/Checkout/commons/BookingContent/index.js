import BookingVerification from './components/BookingVerification';
import PointOfContact from './components/PointOfContact';
import styles from './styles.module.css';

function BookingContent({ detail = {}, getCheckout = () => {}, isChannelPartner = false }) {
	const MAPPING = [
		{
			key       : 'booking_verification',
			component : BookingVerification,
			label     : 'Share Quotation',
			props     : {
				detail,
			},
		},
		{
			key       : 'point_of_contact',
			component : PointOfContact,
			label     : 'Shipment Point of Contact',
			props     : {
				detail,
				bookingConfirmationMode: [],
				getCheckout,
				isChannelPartner,
			},
		},
	];

	return (
		<div className={styles.container}>
			{MAPPING.map((item) => {
				const { key, component:ActiveComponent, label, props:activeComponentProps } = item;

				return (
					<div key={key} className={styles.ind_container}>
						<div className={styles.heading}>{label}</div>

						<ActiveComponent {...activeComponentProps} />
					</div>
				);
			})}
		</div>
	);
}

export default BookingContent;
