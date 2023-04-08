import { Modal } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import ButtonComponent from './ButtonComponent';
import FeedbackForms from './FeedbackForms';
import styles from './styles.module.css';

function FeedbackFormModal({
	action = '',
	item = {},
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
	};

	return (
		<div className={styles.feedback_button}>
			<div className={styles.add_button}>
				<ButtonComponent
					item={item}
					action={action}
					setShowModal={setShowModal}
					showTypePopover={showTypePopover}
					setShowTypePopover={setShowTypePopover}
					feedback_id={feedback_id}
				/>
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
							{![true, 'employed'].includes(showModal) && ` (${startCase(showModal)})`}
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
