/* eslint-disable react-hooks/exhaustive-deps */
import { Toast, Toggle, Textarea, Loader, Button } from '@cogoport/components';
// import { IcMTick } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import EmptyState from '../../../../common/EmptyState';
import useCreateOmniNote from '../../../../hooks/useCreateOmniNote';
import useGetListNotes from '../../../../hooks/useGetListNotes';
import useUpdateNote from '../../../../hooks/useUpdateNote';

import NotesList from './NotesList';
import styles from './styles.module.css';

function AgentNotes({
	activeMessageCard = {},
	activeTab = '',
	activeVoiceCard = {},
	customerId,
}) {
	const [noteValue, setNoteValue] = useState('');
	const [editNote, setEditNote] = useState(false);
	const [active, setActive] = useState(false);
	const [updateId, setUpdateId] = useState();
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		if (showForm) {
			setShowForm(false);
		}
	}, [customerId]);

	const { noteData, fetchListNotes, listLoading, firstLoading } = useGetListNotes({
		active,
		activeMessageCard,
		activeTab,
		activeVoiceCard,
		customerId,
	});
	const { list = [] } = noteData || {};

	const { omniChannelNote = () => {}, createLoading } = useCreateOmniNote({
		editNote,
		fetchListNotes,
		activeMessageCard,
		activeTab,
		activeVoiceCard,
	});
	const { updateNote } = useUpdateNote({ fetchListNotes, setEditNote });

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

	const handleClick = async (i) => {
		const { notes_data, id } = i || {};
		setEditNote(true);
		setNoteValue(notes_data);
		setUpdateId(id);
	};

	const handleDelete = async (val) => {
		await updateNote({ val, type: 'delete' });
	};

	const handleNotes = () => {
		setShowForm(true);
	};

	if (isEmpty(list) && !showForm && !listLoading && !firstLoading) {
		return <EmptyState type="notes" handleNotes={handleNotes} />;
	}

	return (
		(showForm || customerId)
        && (firstLoading ? (
	<div className={styles.loader_div}>
		<Loader
			themeType="primary"
			style={{
				width          : '50px',
				display        : 'flex',
				justifyContent : 'center',
				alignItem      : 'center',
			}}
		/>
	</div>
        ) : (
	<div className={styles.container}>
		<div className={styles.title}>Notes</div>
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
			<NotesList
				list={list}
				handleClick={handleClick}
				handleDelete={handleDelete}
				listLoading={listLoading}
			/>
		</div>
	</div>
        ))
	);
}
export default AgentNotes;
