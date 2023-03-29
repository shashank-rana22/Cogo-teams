import { Button, Datepicker } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';
import useFormDeadline from './useFormDeadline';

function DeadlineModal({ setOpenActivateModal = () => {}, onSubmitText = 'Add Deadline' }) {
	const [deadline, setDeadline] = useState(null);

	const { loading, onUpdateFormDeadline } = useFormDeadline({ setOpenActivateModal });

	return (
		<div>
			Please select the deadline for the forms. Forms will be accessible
			for the edits to the managers till the specified deadline.

			<div style={{ fontWeight: '600', marginTop: '8px' }}>
				Also, please remember to
				update the deadline before the deadline
				if extension is required, otherwise, form deadline can not be updated
				till the start of the next month.
			</div>

			<div className={styles.deadline_container}>
				<Datepicker
					showTimeSelect
					dateFormat="MM/dd/yyyy HH:mm X"
					value={deadline}
					onChange={setDeadline}
					placeholder="Select Deadline"
					name="date"
				/>

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
		</div>
	);
}
export default DeadlineModal;
