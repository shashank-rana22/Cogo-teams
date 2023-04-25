import { Button, Datepicker } from '@cogoport/components';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useState } from 'react';

import styles from './styles.module.css';
import useFormDeadline from './useFormDeadline';

function DeadlineModal({
	setOpenActivateModal = () => {}, onSubmitText = 'Add Deadline',
	refetchFormDeadline = () => {}, formDeadline = '',
}) {
	const [deadline, setDeadline] = useState(null);

	const { loading, onUpdateFormDeadline } = useFormDeadline({ setOpenActivateModal, refetchFormDeadline });

	return (
		<>
			Please select the deadline for the forms. Forms will be accessible
			for the edits to the managers till the specified deadline.

			<div style={{ fontWeight: '600', marginTop: '8px' }}>
				Also, please remember to
				update the deadline before the deadline
				if extension is required, otherwise, form deadline can not be updated
				till the start of the next month/feedback cycle.
			</div>

			<div className={styles.deadline_container}>
				<div className={styles.time}>
					<Datepicker
						showTimeSelect
						dateFormat="MM/dd/yyyy HH:mm X"
						value={deadline}
						onChange={setDeadline}
						placeholder="Select Deadline"
						name="date"
					/>
					<div className={styles.current_deadline}>
						Current Deadline
						<div style={{ fontWeight: '600' }}>
							{(formDeadline || '').toString() !== '0001-01-01T00:00:00Z'
								? formatDate({
									date       : formDeadline,
									formatType : 'dateTime',
									dateFormat : 'dd MMM yyyy',
									timeFormat : 'HH:mm aaa',
									separator  : ',   ',
								}) : '---'}
						</div>
					</div>
				</div>

				<div className={styles.button_container}>
					<Button
						themeType="tertiary"
						onClick={() => setOpenActivateModal(false)}
						loading={loading}
					>
						Cancel
					</Button>

					<Button
						onClick={() => onUpdateFormDeadline(deadline)}
						loading={loading}
						disabled={!deadline}
					>
						{onSubmitText}

					</Button>
				</div>
			</div>
		</>
	);
}
export default DeadlineModal;
