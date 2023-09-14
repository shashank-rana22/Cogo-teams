import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

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
	const { t } = useTranslation(['allocation']);

	const liveAndExpiredVersions = list.filter((item) => ['live', 'expired'].includes(item?.status));

	const drafts = list.filter((item) => item.status === 'draft');

	return (
		<div className={styles.modal_container}>
			<div className={styles.head_text}>
				{t('allocation:preferred_method_for_creating_new_version')}
			</div>

			<div className={styles.button_container}>

				<ModalOptions
					onClick={() => setMode('new')}
					lable={t('allocation:preferred_method_for_creating_new_version_phrase_a')}
				/>

				{!isEmpty(liveAndExpiredVersions) ? (

					<ModalOptions
						onClick={() => setMode('choose_published_version')}
						lable={t('allocation:preferred_method_for_creating_new_version_phrase_b')}
					/>

				) : null}

				{!isEmpty(drafts) ? (

					<ModalOptions
						onClick={() => setMode('saved-draft')}
						lable={t('allocation:preferred_method_for_creating_new_version_phrase_c')}
					/>

				) : null}

			</div>
		</div>
	);
}

export default CreateModal;
