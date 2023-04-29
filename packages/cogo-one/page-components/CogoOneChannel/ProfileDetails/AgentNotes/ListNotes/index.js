import { Toggle } from '@cogoport/components';
import React from 'react';

import Notes from './Notes';
import styles from './styles.module.css';

function ListNotes({
	active,
	setActive,
	listLoading,
	list,
	updateNote,
}) {
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
					handleDelete={handleDelete}
					listLoading={listLoading}
				/>
			</div>

		</>
	);
}

export default ListNotes;
