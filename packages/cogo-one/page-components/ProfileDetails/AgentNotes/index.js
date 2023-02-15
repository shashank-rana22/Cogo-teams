import { Toggle, Textarea, ButtonIcon } from '@cogoport/components';
import { IcMTick, IcMDelete } from '@cogoport/icons-react';
import { useState } from 'react';

import dummyNotesData from '../../../configurations/dummyNotesData';
import useCreateOmniNote from '../../../hooks/useCreateOmniNote';
import useGetListNotes from '../../../hooks/useGetListNotes';

import styles from './styles.module.css';

function AgentNotes({ activeMessageCard }) {
	const [noteValue, setNoteValue] = useState('');
	console.log('noteValue', noteValue);
	const [editNote, setEditNote] = useState(false);
	const [active, setActive] = useState(false);
	const { noteData, fetchListNotes } = useGetListNotes({ activeMessageCard, active });
	console.log('noteData', noteData);
	const { omniChannelNote = () => {} } = useCreateOmniNote({ editNote, fetchListNotes });

	const handleSubmit = async () => {
		await omniChannelNote(noteValue);
		setNoteValue('');
	};

	const handleClick = () => {
		setEditNote(true);
		setEditNote(false);
	};

	const handleDelete = async () => {
		await omniChannelNote();
	};
	return (
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
			{(dummyNotesData || []).map((item) => {
				const { description, time } = item;
				return (
					<div className={styles.notes_container}>
						<div className={styles.content} onClick={handleClick} role="presentation">
							{description}
						</div>
						<ButtonIcon size="sm" icon={<IcMDelete onClick={handleDelete} />} themeType="primary" />
						<div className={styles.footer}>
							<div className={styles.note_time}>{time}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
export default AgentNotes;
