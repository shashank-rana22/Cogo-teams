import ShipmentTimeline from './ShipmentTimeline';
import styles from './styles.module.css';

function Accordion({ item, shipmentTimelineData, shipmentTimelineLoading }) {
	const { cargo_details = [], bn_number = 'N/A' } = item || {};

	let total_container = 0;

	cargo_details.forEach((obj) => {
		const { containers_count = 0 } = obj || {};
		total_container += containers_count;
	});

	return (
		<div className={styles.container}>

			<div className={styles.body}>

				<div className={styles.content}>
					<div className={styles.details}>
						<div className={styles.booking_note}>
							<div className={styles.label}>Booking Note:</div>

							<div className={styles.bn_number}>{bn_number}</div>
						</div>

						<div className={styles.label}>
							No. of Containers:
							{'  '}
							<b>{total_container || 0}</b>
						</div>
					</div>

				</div>

				<ShipmentTimeline
					shipmentTimelineData={shipmentTimelineData}
					shipmentTimelineLoading={shipmentTimelineLoading}
				/>
			</div>
		</div>
	);
}

export default Accordion;
