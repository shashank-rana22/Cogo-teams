import ShipmentTimeline from './ShipmentTimeline';
import styles from './styles.module.css';

function Accordion({ shipmentTimelineData, shipmentTimelineLoading }) {
	return (
		<div className={styles.container}>

			<div className={styles.body}>

				<div className={styles.content}>
					<div className={styles.details}>
						<div className={styles.booking_note}>
							<div className={styles.label}>Booking Note:</div>

							<div className={styles.bn_number}>BN22001KF4496</div>
						</div>

						<div className={styles.label}>
							No. of Containers:
							{'  '}
							<b>10</b>
						</div>
					</div>

				</div>

				<div className={styles.shipment_timeline}>
					<ShipmentTimeline
						shipmentTimelineData={shipmentTimelineData}
						shipmentTimelineLoading={shipmentTimelineLoading}
					/>
				</div>
			</div>
		</div>
	);
}

export default Accordion;
