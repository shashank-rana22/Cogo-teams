import { InputController } from '@cogoport/forms';
import { IcMArrowDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function NotesHrbp({ control = {}, errors = {}, is_complete = false }) {
	const [showNotes, setShowNotes] = useState(true);

	return (
		<div className={styles.container}>
			<div className={styles.heading} aria-hidden onClick={() => setShowNotes(!showNotes)}>
				<span>Notes for HRBP</span>

				<IcMArrowDown
					width={16}
					height={16}
					className={showNotes ? styles.caret_active : styles.caret_arrow}
				/>
			</div>

			<div className={showNotes ? styles.item_container : styles.item_container_closed}>
				<div className={styles.name_input_container}>
					<InputController
						size="md"
						placeholder="Type your notes here"
						control={control}
						name="notes"
						rules={{ required: 'this is required' }}
						disabled={is_complete}
					/>
					{errors.notes ? <span className={styles.error}>*required</span> : null}
				</div>

			</div>

		</div>
	);
}

export default NotesHrbp;
