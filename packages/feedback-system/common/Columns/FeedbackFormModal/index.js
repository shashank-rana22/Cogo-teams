import { Popover, Button, Modal } from '@cogoport/components';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import FeedbackForms from './FeedbackForms';
import styles from './styles.module.css';

// const getSaturday = (date) => {
// 	date.setDate(1);
// 	while (date.getDay() !== 6) {
// 		date.setDate(date.getDate() + 1);
// 	}
// 	return date;
// };

const formTypes = [
	{ label: 'Employed', value: 'employed' },
	{ label: 'New', value: 'new' },
	{ label: 'Resigned', value: 'resigned' },
];

function FeedbackFormModal({
	action = '',
	item = {},
	getTeamFeedbackList = () => {},
	setRefetchReportees = () => {},
}) {
	const {
		user_id: userId = '',
		feedback_id = '',
	} = item;

	const [showModal, setShowModal] = useState(false);
	const [showTypePopover, setShowTypePopover] = useState(false);

	const onCloseFunction = () => {
		setShowModal(false);
		getTeamFeedbackList();
	};

	const content = formTypes.map((type) => (
		<div
			className={styles.popover_item}
			key={type.value}
			role="button"
			tabIndex={0}
			onClick={(e) => {
				e.stopPropagation();
				setShowModal(type.value);
				setShowTypePopover(false);
			}}
		>
			{type.label}
		</div>
	));

	// const currentDate = new Date();

	// const firstSaturday = getSaturday(currentDate);

	// const timeAfterTwoDays = addDays(firstSaturday, 2);

	// if (!(currentDate > firstSaturday && currentDate < timeAfterTwoDays)) {
	// 	return (
	// 		<div className={styles.feedback_button}>
	// 			<Button className={styles.feedback_form_button} disabled>
	// 				<IcMEdit style={{ marginRight: '4px' }} width={14} height={14} fill="#393f70" />
	// 				<p className={styles.feedback_button_text}>
	// 					EDIT
	// 				</p>
	// 			</Button>
	// 		</div>
	// 	);
	// }

	function ButtonComponent() {
		if (action === 'show') {
			return (
				<Button
					size="md"
					themeType="link"
					onClick={() => setShowModal(true)}
				>
					View Form
				</Button>
			);
		}
		// if (isEmpty(feedback_id)) {
		return (
			<Popover
				visible={showTypePopover}
				placement="left"
				render={content}
				onClickOutside={() => setShowTypePopover(false)}
				interactive
			>
				<Button
					size="sm"
					themeType="primary"
					disabled={!isEmpty(feedback_id)}
					onClick={() => 	setShowTypePopover(!showTypePopover)}
				>

					<>
						<IcMPlusInCircle style={{ marginRight: '4px' }} width={16} height={16} />
						ADD
					</>
				</Button>
			</Popover>
		);
		// }

		// return (
		// 	<Button
		// 		size="sm"
		// 		themeType="primary"
		// 				// disabled={!isEmpty(feedback_id)}
		// 		onClick={() => 	setShowTypePopover(!showTypePopover)}
		// 	>
		// 		<>
		// 			<IcMEdit style={{ marginRight: '4px' }} width={16} height={16} />
		// 			EDIT
		// 		</>
		// 	</Button>
		// );
	}

	return (
		<div className={styles.feedback_button}>
			<div className={styles.add_button}>
				<ButtonComponent />
			</div>

			{showModal && (
				<Modal
					show={showModal}
					onClose={() => onCloseFunction()}
					size={showModal !== 'resigned' ? 'xl' : 'md'}
				>
					<Modal.Header title={(
						<div className={styles.modal_header}>
							Feedback Form For
							{' '}
							:
							{' '}
							<span>
								{startCase(item.name)}
							</span>
							{showModal !== 'employed' && ` (${startCase(showModal)})`}
						</div>
					)}
					/>

					<Modal.Body style={{ padding: '0px', maxHeight: '60vh' }}>
						<FeedbackForms
							action={action}
							userId={userId}
							item={item}
							showForm={showModal}
							setShowForm={setShowModal}
							setRefetchReportees={setRefetchReportees}
						/>
					</Modal.Body>
				</Modal>
			)}

		</div>
	);
}

export default FeedbackFormModal;
