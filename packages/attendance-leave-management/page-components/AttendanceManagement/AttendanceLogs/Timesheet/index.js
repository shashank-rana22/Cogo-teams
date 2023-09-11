import { Modal, Button, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcCCheckIn, IcCCheckOut } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import useGetAttendanceTimesheet from '../../../../hooks/useGetAttendanceTimesheet';

import styles from './styles.module.css';

const SKELETON_COUNT = 5;
const INDEX_VALUE = 1;
const DECIMAL_POINTS = 11;

function Timesheet({ show = false, onClose = () => {}, selectedDate = '' }) {
	const { loading, data } = useGetAttendanceTimesheet(selectedDate);

	const { deviation_hrs, total_hrs, logs } = data || {};

	return (
		<Modal size="md" show={show} onClose={onClose} placement="top" className={styles.modal_container}>
			<Modal.Header title="TimeSheet" />
			<Modal.Body>
				{loading ? [...Array(SKELETON_COUNT).keys()].map((val) => (
					<Placeholder key={val} height="50px" styles={{ width: '100%' }} margin="0px 0px 20px 0px" />
				)) : (
					<div>
						<div className={styles.time_container}>
							<div>
								<div className={styles.title_text}>
									Date
								</div>
								<div className={styles.time_value}>
									{formatDate({
										date       : selectedDate,
										dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
										formatType : 'date',
									})}
								</div>
							</div>
							<div>
								<div className={styles.title_text}>
									Total Hrs
								</div>
								<div className={styles.time_value}>
									{total_hrs || '--'}
								</div>
							</div>
							<div>
								<div className={styles.title_text}>
									Deviation Hours
								</div>
								<div className={styles.time_value}>
									{deviation_hrs || '--'}
								</div>
							</div>
						</div>
						<div className={styles.timesheet_container}>
							{ logs?.map((val, index) => (
								<div className={styles.flex} key={`${total_hrs}_${index + INDEX_VALUE}`}>
									<div className={styles.icon_container}>
										{index === GLOBAL_CONSTANTS.zeroth_index
											? <IcCCheckIn width={20} height={20} />
											: <IcCCheckOut width={20} height={20} />}
									</div>
									<div className={styles.timesheet_title}>
										<div className={styles.title_text}>
											Check
											{' '}
											{index === GLOBAL_CONSTANTS.zeroth_index ? 'in' : 'out'}
										</div>
										<div>
											{val.in_out_time ? formatDate({
												date       : val.in_out_time,
												dateFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
												formatType : 'time',
											}) : '--'}
										</div>
									</div>
									<div className={styles.capture}>
										<div className={styles.title_text}>
											Capture Type
										</div>
										<div>
											{startCase(val.capture_type) || '--'}
										</div>
									</div>
									<div className={styles.lat_long}>
										<div className={styles.title_text}>
											Latitude
										</div>
										<div>
											{val.location.latitude
												? parseFloat(val.location.latitude).toFixed(DECIMAL_POINTS) : '--'}
										</div>
									</div>
									<div className={styles.lat_long}>
										<div className={styles.title_text}>
											Longitude
										</div>
										<div>
											{val.location.longitude
												? parseFloat(val.location.longitude).toFixed(DECIMAL_POINTS) : '--'}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={onClose}>Cancel</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default Timesheet;
