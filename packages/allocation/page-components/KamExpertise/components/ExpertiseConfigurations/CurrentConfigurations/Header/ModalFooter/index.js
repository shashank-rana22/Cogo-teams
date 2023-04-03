import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function ModalFooter(props) {
	const {
		setMode, setSelectedVersion, selectedVersion, onCreate,
		createModalLoading, versionName,
	} = props;

	return (
		<div className={styles.modal_footer}>
			{selectedVersion?.version_number ? (
				<span className={styles.footer_text}>
					Selected Version:
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
					Back
				</Button>

				<Button
					className={styles.button}
					disabled={isEmpty(selectedVersion) || isEmpty(versionName)}
					onClick={() => {
						onCreate();
					}}
					loading={createModalLoading}
				>
					Create
				</Button>
			</span>
		</div>
	);
}

export default ModalFooter;
