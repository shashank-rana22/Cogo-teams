/* eslint-disable react-hooks/exhaustive-deps */
import { Loader, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import DetailViewer from '../../../../common/DetailViewer';
import EmptyState from '../../../../common/EmptyState';
import useCreateOmniNote from '../../../../hooks/useCreateOmniNote';
import useGetListNotes from '../../../../hooks/useGetListNotes';
import useUpdateNote from '../../../../hooks/useUpdateNote';

import AddNotes from './AddNotes';
import ListNotes from './ListNotes';
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

	const [newNote, setNewNote] = useState(false);
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

	const { omniChannelNote = () => { }, createLoading } = useCreateOmniNote({
		editNote,
		fetchListNotes,
		activeMessageCard,
		activeTab,
		activeVoiceCard,
	});
	const { updateNote } = useUpdateNote({ fetchListNotes, setEditNote });

	const formComponent = () => (
		<AddNotes
			noteValue={noteValue}
			setNoteValue={setNoteValue}
			createLoading={createLoading}
			updateId={updateId}
			editNote={editNote}
			updateNote={updateNote}
			omniChannelNote={omniChannelNote}
			setNewNote={setNewNote}
		/>
	);

	const listComponent = () => (
		<ListNotes
			active={active}
			setActive={setActive}
			listLoading={listLoading}
			list={list}
			setEditNote={setEditNote}
			setNoteValue={setNoteValue}
			setUpdateId={setUpdateId}
			updateNote={updateNote}
		/>
	);

	if (isEmpty(list) && !showForm && !listLoading && !firstLoading) {
		return (
			<EmptyState
				type="notes"
				setShowForm={setShowForm}
			/>
		);
	}

	return (
		(showForm || customerId)
		&& (firstLoading ? (
			<div className={styles.loader_div}>
				<Loader
					themeType="primary"
					className={styles.loader_container}
				/>
			</div>
		) : (
			<div className={styles.container}>
				<div className={styles.title}>
					<div>Notes</div>
					<Button
						size="md"
						themeType="secondary"
						onClick={() => setNewNote((p) => !p)}
					>
						{!newNote ? 'New Note' : 'Discard'}
					</Button>
				</div>
				<DetailViewer
					formComponent={formComponent}
					listComponent={listComponent}
					AddNote={newNote}
					setNewNote={setNewNote}
				/>
			</div>
		))
	);
}

export default AgentNotes;
