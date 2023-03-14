import React, { useState } from 'react';
import { Button, Toggle } from '@cogoport/front/components/admin';
import { IcMInfo } from '@cogoport/icons-react';
import { stakeholderCheck } from '../../../../commons/helpers/stakeholderCheck';
import BookingRequirements from './BookingRequirements';
import Loader from './Loader';
import styles from './styles.module.css';

const Header = ({
	completed_count,
	showCompletedTask = false,
	setShowCompletedTask = () => {},
	showMyTasks = false,
	setMyTasks = () => {},
	loading = false,
	tasksCount,
	servicesList = {},
	shipment_data = {},
	primary_service = {},
}) => {
	if (loading) {
		return <Loader />;
	}

	const [showRequirements, setShowRequirements] = useState(false);

	const freightServiceData = (servicesList || []).filter((service) => {
		return service?.service_type === 'fcl_freight_service';
	});

	const { is_kam, is_so1 } = stakeholderCheck();

	let showBookingDetails = false;
	if (
		(is_so1 || is_kam) &&
		shipment_data?.state !== 'shipment_recieved' &&
		primary_service?.service_type === 'fcl_freight_service'
	) {
		showBookingDetails = true;
	}

	return (
		<div className={styles.container}>
			<div className={styles.top_panel}>
				<div className={styles.left_content}>{`${completed_count} / ${tasksCount} Tasks Completed`}</div>

				<div className={styles.right_content}>
					<div className={styles.toggle_for}>
						<div style={{ marginTop: '2px' }}>Hide completed tasks</div>

						<Toggle value={showCompletedTask} onChange={setShowCompletedTask} />
					</div>

					<div className={styles.toggle_for}>
						<div style={{ marginTop: '2px' }}>Show only my tasks</div>

						<Toggle value={showMyTasks} onChange={setMyTasks} />
					</div>
				</div>
			</div>

			{showBookingDetails ? (
				<div className={styles.button_panel}>
					<IcMInfo fill="#E0BA4A" width={20} height={20} />
					<div className={styles.text}>Booking Requirements</div>
					<Button
						onClick={() => {
							setShowRequirements(true);
						}}
						className="secondary"
					>
						View
					</Button>
				</div>
			) : null}

			{showRequirements ? (
				<BookingRequirements
					showRequirements={showRequirements}
					setShowRequirements={setShowRequirements}
					mainServiceData={freightServiceData}
					is_so1={is_so1}
				/>
			) : null}
		</div>
	);
};

export default Header;
