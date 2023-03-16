import React from 'react';

import DraftModalBody from './DraftModalBody';
import NewVersionModalBody from './NewVersionModalBody';
import PublishedModalBody from './PublishedModalBody';
import styles from './styles.module.css';

function CreateModal({ mode, setMode }) {
	if (mode === 'new-version') {
		return (
			<NewVersionModalBody
				setMode={setMode}
			/>
		);
	} if (mode === 'published-version') {
		return (
			<PublishedModalBody />
		);
	} if (mode === 'saved-draft') {
		return (
			<DraftModalBody />
		);
	}
	return (
		<div className={styles.modal_container}>
			<div className={styles.head_text}>
				Please choose your preferred method for creating a new verison:
			</div>
			<div className={styles.button_container} style={{ display: 'flex', justifyContent: 'center' }}>
				<button
					onClick={() => { setMode('new-version'); }}
					className={styles.button}
				>
					a. Start from scratch (empty version)

				</button>
				<button
					onClick={() => { setMode('published-version'); }}
					className={styles.button}
				>
					b. Choose from published versions

				</button>
				<button
					onClick={() => { setMode('saved-draft'); }}
					className={styles.button}
				>
					c. Start where you left off (saved draft)

				</button>
			</div>
		</div>
	);
}

export default CreateModal;
