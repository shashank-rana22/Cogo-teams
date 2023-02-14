import { Toggle } from '@cogoport/components';

import dummyNotesData from '../../../configurations/dummyNotesData';

import styles from './styles.module.css';

function AgentNotes() {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Notes</div>
			<div className={styles.note_editor}>
				<div className={styles.editor_header} />
				<h6>dfghdfjkgnf</h6>
			</div>
			<div className={styles.toggle_div}>
				<Toggle
					name="a5"
					size="sm"
					disabled={false}
					offLabel="All Notes"
					onLabel="My Notes"
				/>
			</div>
			{(dummyNotesData || []).map((item) => {
				const { title, description, time, name } = item;
				return (
					<div className={styles.notes_container}>
						<div className={styles.note_title}>{title}</div>
						<div className={styles.note_description}>{description}</div>
						<div className={styles.footer}>
							<div className={styles.note_time}>{time}</div>
							<div className={styles.note_time}>{name}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
export default AgentNotes;
