import React, { useState } from 'react';

import BgCalender from './BgCalender';
import Events from './Events';
import styles from './styles.module.css';

function CalendarModal({
	setEventValendar = () => {},
	eventClender = false,
}) {
	console.log('eventClender:', eventClender);
	console.log('setEventValendar :', setEventValendar);
	const [addEvents, setAddEvents] = useState(true);

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
			<div className={styles.container}>
				<div className={styles.event_list}>
					<Events addEvents={addEvents} setAddEvents={setAddEvents} />
				</div>
				<div className={styles.calendar}>
					{!addEvents ? <div className={styles.masked_calender} /> : null }
					<div className={styles.calendar_container}>
						<BgCalender />
					</div>
				</div>
			</div>
		</div>
	);
}

export default CalendarModal;
