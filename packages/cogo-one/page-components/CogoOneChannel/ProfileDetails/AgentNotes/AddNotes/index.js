import { Textarea, Button, Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function AddNotes({
	noteValue,
	setNoteValue,
	createLoading,
	updateId,
	editNote,
	updateNote,
	omniChannelNote,
}) {
	const handleSubmit = async () => {
		if (!isEmpty(noteValue)) {
			if (editNote) {
				await updateNote({ noteValue, type: 'update', updateId });
			} else {
				await omniChannelNote({ noteValue });
			}
		} else {
			Toast.error('Enter description');
		}
		setNoteValue('');
	};

	return (
		<div className={styles.note_editor}>
			<div>
				<div className={styles.editor_header} />
				<Textarea
					name="a5"
					size="md"
					placeholder="Description"
					value={noteValue}
					onChange={(val) => setNoteValue(val)}
				/>
			</div>
			<div className={styles.note_footer}>
				<Button
					size="md"
					themeType="secondary"
					loading={createLoading}
					onClick={handleSubmit}
				>
					Save
				</Button>
			</div>
		</div>
	);
}

export default AddNotes;
