import { InputController } from '@cogoport/forms';
import { IcMArrowDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function AdditionalRemarks({ control = {}, isComplete = false, confirmedValues = {} }) {
	const [showNotes, setShowNotes] = useState(true);
	// console.log('add remark file log :: ', confirmedValues?.additionalRemarks, isComplete);
	return (
		<div className={styles.container} key={confirmedValues}>
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
						value={isComplete ? confirmedValues?.additionalRemarks : ''}
						disabled={isComplete}
						control={control}
						name="additionalRemarks"
					/>
				</div>
			</div>
		</div>
	);
}

export default AdditionalRemarks;
