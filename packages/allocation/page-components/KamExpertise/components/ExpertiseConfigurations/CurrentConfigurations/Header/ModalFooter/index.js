import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function ModalFooter(props) {
	const { t } = useTranslation(['allocation']);

	const {
		setMode, setSelectedVersion, selectedVersion, onCreate,
		createModalLoading, versionName,
	} = props;

	return (
		<div className={styles.modal_footer}>
			{selectedVersion?.version_number ? (
				<span className={styles.footer_text}>
					{t('allocation:selected_version_label')}
					{' '}
					{selectedVersion?.version_number}
				</span>
			) : (null)}

			<span className={styles.footer_button}>
				<Button
					themeType="tertiary"
					className={styles.button}
					disabled={createModalLoading}
					onClick={() => {
						setMode('initial-mode');
						setSelectedVersion({});
					}}
				>
					{t('allocation:back_button')}
				</Button>

				<Button
					className={styles.button}
					disabled={isEmpty(selectedVersion) || isEmpty(versionName)}
					onClick={() => {
						onCreate();
					}}
					loading={createModalLoading}
				>
					{t('allocation:create_button_label')}
				</Button>
			</span>
		</div>
	);
}

export default ModalFooter;
