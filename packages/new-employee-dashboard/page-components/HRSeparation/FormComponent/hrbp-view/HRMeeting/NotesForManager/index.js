import { InputController } from '@cogoport/forms';
import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function NotesForManager({ control }) {
	const [show, setShow] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.heading} aria-hidden onClick={() => setShow(!show)}>
				Notes for Manager
				{show ? <IcMArrowUp /> : <IcMArrowDown />}
			</div>

			{show && (
				<div className={styles.body}>
					<InputController
						control={control}
						name="your_notes_manager"
						size="md"
						style={{ marginRight: '8px', width: '100%' }}
						placeholder="Type your notes here"
						rules={{ required: 'this is required' }}
					/>
				</div>
			) }
		</div>
	);
}

export default NotesForManager;
