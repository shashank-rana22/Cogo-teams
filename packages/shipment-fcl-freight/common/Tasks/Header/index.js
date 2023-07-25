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

	const { activeStakeholder, shipment_data, primary_service, stakeholderConfig } = contextValues || {};

	const showBookingRequirementsCondition = BOOKING_REQUIREMENTS_ROLES
		.includes(activeStakeholder) && shipment_data?.state !== 'shipment_received';

	const showSupplyRemarks = SUPPLY_REMARKS_ROLES.includes(activeStakeholder);
	const show_others_tasks = !!stakeholderConfig?.tasks?.show_others_tasks;

	const supplyRemarks = primary_service?.booking_preferences?.[GLOBAL_CONSTANTS.zeroth_index]?.remarks;

	return (
		<header className={styles.container}>
			<div className={styles.top_panel}>
				<span className={styles.left_content}>
					{`${completedTaskCount} / ${count} Tasks Completed`}
				</span>

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

					{show_others_tasks ? (
						<div className={styles.toggle_container}>
							<span>Hide completed tasks</span>
							<Toggle
								checked={hideCompletedTasks}
								onChange={() => setHideCompletedTasks((prevVal) => !prevVal)}
							/>
						</div>
					) : null}

					{show_others_tasks ? (
						<div className={styles.toggle_container}>
							<span>Show only my tasks</span>
							<Toggle
								checked={showMyTasks}
								onChange={() => setShowMyTasks(!showMyTasks)}
							/>
						</div>
					) : null }
				</div>
			</div>

			{showBookingRequirementsCondition
				? (
					<div className={styles.booking_req_heading}>
						<span>Booking Requirements</span>
						<Button
							size="sm"
							themeType="linkUi"
							onClick={(prev) => setShowBookingReq(!prev)}
						>
							<span className={styles.booking_req_button_text}>View</span>
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
		</header>
	);
}

export default Header;
