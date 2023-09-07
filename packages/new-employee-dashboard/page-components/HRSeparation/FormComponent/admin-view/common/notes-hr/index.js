import { Input } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function NotesHrbp() {
	const [showNotes, setShowNotes] = useState(false);

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

					<Input size="md" placeholder="Type your notes here" className={styles.name_input} />

				</div>
			</div>

		</div>
	);
}

export default NotesHrbp;
