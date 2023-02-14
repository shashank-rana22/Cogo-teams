import { Toggle, Textarea } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';

import dummyNotesData from '../../../configurations/dummyNotesData';

import styles from './styles.module.css';

function AgentNotes() {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Notes</div>
			<div className={styles.note_editor}>
				<div>
					<div className={styles.editor_header} />
					<Textarea name="a5" size="md" placeholder="Description" />
				</div>
				<div className={styles.note_footer}>
					<div className={styles.submit_button}>
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
