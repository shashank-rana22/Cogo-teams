import { Button, Toggle, Tooltip } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useContext, useState } from 'react';

import BookingRequirements from './BookingRequirements';
import styles from './styles.module.css';

const BOOKING_REQUIREMENTS_ROLES = ['superadmin', 'booking_desk', 'booking_desk_manager', 'so1_so2_ops'];
const SUPPLY_REMARKS_ROLES = ['superadmin', 'admin', 'prod_process_owner', 'document_desk', 'document_desk_manager'];

function Header({
	count = 0,
	completedTaskCount = 0,
	hideCompletedTasks = false,
	setHideCompletedTasks = () => {},
	showMyTasks = true,
	setShowMyTasks = () => {},
}) {
	const contextValues = useContext(ShipmentDetailContext);

	const [showBookingReq, setShowBookingReq] = useState(false);

	const { activeStakeholder, shipment_data, primary_service } = contextValues || {};

	const showBookingRequirementsCondition = BOOKING_REQUIREMENTS_ROLES
		.includes(activeStakeholder) && shipment_data?.state !== 'shipment_received';

	const showSupplyRemarks = SUPPLY_REMARKS_ROLES.includes(activeStakeholder);
	const supplyRemarks = primary_service?.booking_preferences?.[GLOBAL_CONSTANTS.zeroth_index]?.remarks;

	return (
		<div className={styles.container}>
			<div className={styles.top_panel}>
				<div className={styles.left_content}>
					{`${completedTaskCount} / ${count} Tasks Completed`}
				</div>

				<div className={styles.right_content}>
					{showSupplyRemarks && supplyRemarks ? (
						<Tooltip
							theme="light"
							placement="bottom"
							animation="shift-away"
							interactive
							content={`Supply Remarks: ${supplyRemarks}`}
						>
							<div className={styles.remarks}>Remarks</div>
						</Tooltip>
					) : null }

					<div className={styles.toggle_container}>
						<div>Hide completed tasks</div>
						<Toggle
							checked={hideCompletedTasks}
							onChange={() => setHideCompletedTasks((prevVal) => !prevVal)}
						/>
					</div>

					<div className={styles.toggle_container}>
						<div>Show only my tasks</div>
						<Toggle
							checked={showMyTasks}
							onChange={() => setShowMyTasks(!showMyTasks)}
						/>
					</div>
				</div>
			</div>

			{showBookingRequirementsCondition
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
