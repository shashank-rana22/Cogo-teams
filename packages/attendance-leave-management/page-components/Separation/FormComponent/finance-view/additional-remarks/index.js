import { InputController } from '@cogoport/forms';
import { IcMArrowDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function AdditionalRemarks({ control = {}, isComplete = false, confirmedValues = {} }) {
	const [showNotes, setShowNotes] = useState(true);

	return (
		<div className={styles.container}>
			<div className={styles.heading} aria-hidden onClick={() => setShowNotes(!showNotes)}>
				<span>Additional Remarks</span>

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
						value={isComplete ? confirmedValues.additionalRemarks : null}
						disabled={isComplete}
						control={control}
						name="notes"
						rules={{ required: 'this is required' }}
					/>
				</div>
			</div>
		</div>
	);
}

export default AdditionalRemarks;
