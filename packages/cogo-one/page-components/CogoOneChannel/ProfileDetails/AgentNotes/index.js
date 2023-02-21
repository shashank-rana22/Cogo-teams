/* eslint-disable react-hooks/exhaustive-deps */
import { Toast, Toggle, Textarea, ButtonIcon, Loader } from '@cogoport/components';
import { IcMTick, IcMDelete } from '@cogoport/icons-react';
import { format, isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import EmptyState from '../../../../common/EmptyState';
import useCreateOmniNote from '../../../../hooks/useCreateOmniNote';
import useGetListNotes from '../../../../hooks/useGetListNotes';
import useUpdateNote from '../../../../hooks/useUpdateNote';

import styles from './styles.module.css';

function AgentNotes({ activeMessageCard = {}, activeTab = '', activeVoiceCard = {}, customerId }) {
	const [noteValue, setNoteValue] = useState('');
	const [editNote, setEditNote] = useState(false);
	const [active, setActive] = useState(false);
	const [updateId, setUpdateId] = useState();
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		if (showForm) { setShowForm(false); }
	}, [customerId]);

	const {
		noteData,
		fetchListNotes, listLoading,
	} = useGetListNotes({ active, activeMessageCard, activeTab, activeVoiceCard, customerId });
	const { list = [] } = noteData || {};

	const { omniChannelNote = () => {} } = useCreateOmniNote({
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

	if (isEmpty(list) && !showForm) {
		return <EmptyState type="notes" handleNotes={handleNotes} />;
	}

	return (
		(showForm || !isEmpty(list)) && (
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
						<div className={styles.submit_button} role="presentation" onClick={handleSubmit}>
							<IcMTick width={18} height={18} />
							Save
						</div>
					</div>
				</div>
				<div className={styles.toggle_div}>
					<Toggle
						name="a5"
						size="sm"
						disabled={false}
						offLabel="All Notes"
						onLabel="My Notes"
						value={active}
						onChange={() => setActive((p) => !p)}
					/>
				</div>
				<div className={styles.wrap}>
					{listLoading ? (
						<div className={styles.loder_div}>
							<Loader themeType="primary" />
						</div>
					)
						: (
							<>
								{(list || []).map((item) => {
									const { notes_data, agent_data, updated_at, id } = item;
									const { name = '' } = agent_data || {};
									return (
										<div className={styles.notes_container}>
											<div
												className={styles.content}
												onClick={() => handleClick(item)}
												role="presentation"
											>
												{(notes_data || []).map((i) => (i || 'NA'))}
											</div>
											<ButtonIcon
												size="sm"
												icon={<IcMDelete onClick={() => handleDelete(id)} />}
												themeType="primary"
											/>
											<div className={styles.footer}>
												<div
													className={styles.note_time}
												>
													{format(updated_at, 'HH:mm a dd MMM')}
												</div>
												<div className={styles.created_by}>{name}</div>
											</div>
										</div>
									);
								})}
							</>
						)}
				</div>
			</div>
		)
	);
}
export default AgentNotes;
