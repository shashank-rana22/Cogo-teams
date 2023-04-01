import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function CreateModal({ setMode, data }) {
	const drafts = data.filter((item) => item.status === 'draft');

	return (
		<div className={styles.modal_container}>
			<div className={styles.head_text}>
				Please choose your preferred method for creating a new verison:
			</div>

			<div className={styles.button_container}>
				<div
					role="presentation"
					onClick={() => setMode('new')}
					className={styles.button}
				>
					a. Start from scratch (empty version)
				</div>

				{!isEmpty(data) ? (
					<div
						role="presentation"
						onClick={() => {
							setMode('choose_published_version');
						}}
						className={styles.button}
					>
						b. Choose from published versions
					</div>
				) : null}

				{!isEmpty(drafts) ? (
					<div
						role="presentation"
						onClick={() => { setMode('saved-draft'); }}
						className={styles.button}
					>
						c. Start where you left off (saved draft)
					</div>
				) : null}
			</div>
		</div>
	);
}

export default CreateModal;
