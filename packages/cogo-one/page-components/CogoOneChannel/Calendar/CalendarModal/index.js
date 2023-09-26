import { IcMCross } from '@cogoport/icons-react';
import React, { useState } from 'react';

import BgCalender from './BgCalender';
import Events from './Events';
import styles from './styles.module.css';

function CalendarModal({
	setEventValendar = () => {},
}) {
	const [addEvents, setAddEvents] = useState(true);
	const [selectedEventData, setSelectedEventData] = useState({});
	console.log('selectedEventData:', selectedEventData);

	return (
	// <Modal
	// 	className={styles.styled_ui_modal_dialog}
	// 	scroll={false}
	// 	show={eventClender}
	// 	size="sm"
	// 	placement="bottom-right"
	// 	onClose={() => setEventValendar(false)}

	// >
	// 	<Modal.Header />
	// 	<Modal.Body>
	// 		<div className={styles.container}>
	// 			<div className={styles.event_list}>
	// 				<Events />
	// 			</div>
	// 			<div className={styles.calendar}>
	// 				<BgCalender />
	// 			</div>
	// 		</div>
	// 	</Modal.Body>
	// </Modal>

		<div className={styles.main_container}>
			<div className={styles.close_calender}>
				<IcMCross width={18} height={18} onClick={() => setEventValendar(false)} />
			</div>
			<div className={styles.container}>
				<div className={styles.event_list}>
					<Events addEvents={addEvents} setAddEvents={setAddEvents} selectedEventData={selectedEventData} />
				</div>
				<div className={styles.calendar}>
					{!addEvents ? <div className={styles.masked_calender} /> : null }
					<div className={styles.calendar_container}>
						<BgCalender setSelectedEventData={setSelectedEventData} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default CalendarModal;
