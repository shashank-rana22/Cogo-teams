import { Button, Toggle, Popover, Toast } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCopy } from '@cogoport/icons-react';
import { useContext, useState } from 'react';

import BookingRequirements from './BookingRequirements';
import styles from './styles.module.css';

const BOOKING_REQUIREMENTS_ROLES = ['superadmin', 'booking_desk', 'booking_desk_manager', 'so1_so2_ops'];
const SUPPLY_REMARKS_ROLES = ['superadmin', 'admin', 'prod_process_owner', 'document_desk', 'document_desk_manager'];

const STYLE_ICON = {
	marginLeft : 4,
	height     : 20,
	width      : 20,
};

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
	const [visibleRemarks, setVisibleRemarks] = useState(false);
	const [visibleCfsDetails, setVisibleCfsDetails] = useState(false);

	const { activeStakeholder, shipment_data, primary_service, stakeholderConfig } = contextValues || {};

	const showBookingRequirementsCondition = BOOKING_REQUIREMENTS_ROLES
		.includes(activeStakeholder) && shipment_data?.state !== 'shipment_received';

	const showSupplyRemarks = SUPPLY_REMARKS_ROLES.includes(activeStakeholder);
	const showCfsDetails = !!stakeholderConfig?.tasks?.show_cfs_details;
	const show_others_tasks = !!stakeholderConfig?.tasks?.show_others_tasks;

	const handleCopy = async (val) => {
		navigator.clipboard
			.writeText(val)
			.then(Toast.info('Copied Successfully !!', { autoClose: 1000 }));
	};

	const cfsDetails = () => (
		<div className={styles.cfs_details}>
			<text>
				{' '}
				CFS Address:
				{primary_service?.cfs_service || 'NA'}
			</text>
			<div
				role="presentation"
				onClick={() => {
					navigator.clipboard.writeText(primary_service?.cfs_service);
				}}
			/>
			<IcMCopy
				onClick={() => handleCopy(primary_service?.cfs_service)}
				style={STYLE_ICON}
			/>
		</div>
	);

	return (
		<div className={styles.container}>
			<div className={styles.top_panel}>
				<div className={styles.left_content}>
					{`${completedTaskCount} / ${count} Tasks Completed`}
				</div>

				<div className={styles.right_content}>
					{showCfsDetails ? (
						<Popover
							placement="bottom"
							trigger="mouseenter"
							caret={false}
							visible={visibleCfsDetails}
							render={cfsDetails()}
						>
							<Button
								size="md"
								themeType="link"
								onClick={() => setVisibleCfsDetails((pev) => !pev)}
							>
								CFS Address

							</Button>
						</Popover>
					) : null }

					{showSupplyRemarks ? (
						<Popover
							placement="bottom"
							trigger="mouseenter"
							caret={false}
							visible={visibleRemarks}
							render={`Supply Remarks: ${primary_service?.booking_preferences?.
								[GLOBAL_CONSTANTS.zeroth_index]?.remarks || 'NA'}`}
						>
							<Button
								size="md"
								themeType="link"
								onClick={() => setVisibleRemarks((pev) => !pev)}
							>
								Remarks

							</Button>
						</Popover>
					) : null }

					{show_others_tasks ? (
						<div className={styles.toggle_container}>
							<div style={{ marginTop: '12px' }}>Hide completed tasks</div>
							<Toggle
								checked={hideCompletedTasks}
								onChange={() => setHideCompletedTasks((prevVal) => !prevVal)}
							/>
						</div>
					) : null }

					{show_others_tasks ? (
						<div className={styles.toggle_container}>
							<div style={{ marginTop: '12px' }}>Show only my tasks</div>

							<Toggle
								checked={showMyTasks}
								onChange={() => {
									setShowMyTasks(!showMyTasks);
								}}
							/>
						</div>
					) : null }
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
