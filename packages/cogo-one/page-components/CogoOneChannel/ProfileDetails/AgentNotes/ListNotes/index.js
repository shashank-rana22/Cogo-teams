import { Toggle } from '@cogoport/components';
import React from 'react';

import Notes from './Notes';
import styles from './styles.module.css';

function ListNotes({
	active,
	setActive,
	listLoading,
	list,
	setEditNote,
	setNoteValue,
	setUpdateId,
	updateNote,
}) {
	const handleClick = async (i) => {
		const { notes_data, id } = i || {};
		setEditNote(true);
		setNoteValue(notes_data);
		setUpdateId(id);
	};

	const handleDelete = async (val) => {
		await updateNote({ val, type: 'delete' });
	};

	return (
		<>
			<div className={styles.toggle_div}>
				<Toggle
					name="a5"
					size="sm"
					offLabel="All Notes"
					onLabel="My Notes"
					checked={active}
					onChange={() => setActive((p) => !p)}
					disabled={listLoading}
				/>
			</div>
			<div className={styles.wrap}>
				<Notes
					list={list}
					handleClick={handleClick}
					handleDelete={handleDelete}
					listLoading={listLoading}
				/>
			</div>

		</>
	);
}

export default ListNotes;
