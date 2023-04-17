import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function ModalOptions({ onClick, lable }) {
	return (
		<div
			role="presentation"
			onClick={onClick}
			className={styles.button}
		>
			{lable}
		</div>
	);
}

function CreateModal({ setMode, list }) {
	const liveAndExpiredVersions = list.filter((item) => ['live', 'expired'].includes(item?.status));

	const drafts = list.filter((item) => item.status === 'draft');

	return (
		<div className={styles.modal_container}>
			<div className={styles.head_text}>
				Please choose your preferred method for creating a new verison:
			</div>

			<div className={styles.button_container}>

				<ModalOptions
					onClick={() => setMode('new')}
					lable="a. Start from scratch (empty version)"
				/>

				{!isEmpty(liveAndExpiredVersions) ? (

					<ModalOptions
						onClick={() => setMode('choose_published_version')}
						lable="b. Choose from published versions"
					/>

				) : null}

				{!isEmpty(drafts) ? (

					<ModalOptions
						onClick={() => setMode('saved-draft')}
						lable="c. Start where you left off (saved draft)"
					/>

				) : null}

			</div>
		</div>
	);
}

export default CreateModal;
