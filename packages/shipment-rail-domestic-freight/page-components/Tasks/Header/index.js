import { Toggle, Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useState, useContext } from 'react';

import BookingRequirements from './BookingRequirements';
import styles from './styles.module.css';

function Header({
	count = 0,
	completedTaskCount = 0,
	hideCompletedTasks = false,
	setHideCompletedTasks = () => {},
	showMyTasks = true,
	setShowMyTasks = () => {},
}) {
	const { stakeholderConfig : { tasks = {} } = {}, shipment_data = {} } = useContext(ShipmentDetailContext);
	const bookingReqCond = !!(tasks.show_booking_req && shipment_data?.state !== 'shipment_received');
	const [showBookingReq, setShowBookingReq] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.top_panel}>
				<div className={styles.left_content}>
					{`${completedTaskCount} / ${count} Tasks Completed`}
				</div>

				<div className={styles.right_content}>
					<div className={styles.toggle_container}>
						<div style={{ marginTop: '12px' }}>Hide completed tasks</div>
						<Toggle
							checked={hideCompletedTasks}
							onChange={() => setHideCompletedTasks((prevVal) => !prevVal)}
						/>
					</div>

					<div className={styles.toggle_container}>
						<div style={{ marginTop: '12px' }}>Show only my tasks</div>

						<Toggle
							checked={showMyTasks}
							onChange={() => {
								setShowMyTasks(!showMyTasks);
							}}
						/>
					</div>
				</div>
			</div>

			{bookingReqCond
				? (
					<div className={styles.booking_req_heading}>
						<div>Booking Requirements</div>
						<Button
							size="sm"
							themeType="linkUi"
							onClick={() => setShowBookingReq(!showBookingReq)}
						>
							<div className={styles.booking_req_button_text}>View</div>
						</Button>
					</div>
				)
				: null}

			{showBookingReq
				? (
					<BookingRequirements
						showBookingReq={showBookingReq}
						setShowBookingReq={setShowBookingReq}
					/>
				)
				: null}
		</div>
	);
}

export default Header;
