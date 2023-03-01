import { Popover, Button, Modal } from '@cogoport/components';
import { IcMEdit, IcMPlusInCircle } from '@cogoport/icons-react';
import { addDays, getYear, getMonth, isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import FeedbackForms from './FeedbackForms';
import styles from './styles.module.css';

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
	feedbackMonth = '',
	feedbackYear = '',
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

	const currentDate = new Date();
	const month = getMonth(currentDate);
	const year = getYear(currentDate);
	const formStartingDate = new Date(year, month, 1);

	const formEndingDate = addDays(formStartingDate, 2);

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
					onClick={() => 	setShowTypePopover(!showTypePopover)}
					disabled={!(currentDate <= formEndingDate && currentDate >= formStartingDate)}
				>
					{isEmpty(feedback_id) ? (
						<>
							<IcMPlusInCircle style={{ marginRight: '4px' }} width={16} height={16} />
							ADD
						</>
					) : (
						<>
							<IcMEdit style={{ marginRight: '4px' }} width={16} height={16} />
							EDIT
						</>
					)}

				</Button>
			</Popover>
		);
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

					<Modal.Body style={{
						padding   : '0px',
						maxHeight : '60vh',
						...(showModal === 'resigned' && { border: 'none' }),
					}}
					>
						<FeedbackForms
							action={action}
							userId={userId}
							feedback_id={feedback_id}
							item={item}
							showForm={showModal}
							setShowForm={setShowModal}
							setRefetchReportees={setRefetchReportees}
							feedbackYear={feedbackYear}
							feedbackMonth={feedbackMonth}
						/>
					</Modal.Body>
				</Modal>
			)}

		</div>
	);
}

export default FeedbackFormModal;
