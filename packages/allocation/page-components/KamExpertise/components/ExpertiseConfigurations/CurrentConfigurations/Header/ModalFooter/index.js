import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function ModalFooter(props) {
	const { setMode, setSelectedVersion, selectedVersion, getVersion, createModalLoading } = props;

	return (
		<div className={styles.modal_footer}>
			{selectedVersion ? (
				<span className={styles.footer_text}>
					Selected Version:
					{' '}
					{' '}
					{selectedVersion}
				</span>
			) : (null)}

			<span className={styles.footer_button}>
				<Button
					themeType="tertiary"
					className={styles.button}
					disabled={createModalLoading}
					onClick={() => {
						setMode('initial-mode');
						setSelectedVersion('');
					}}
				>
					Back
				</Button>

				<Button
					className={styles.button}
					disabled={!selectedVersion}
					onClick={() => getVersion()}
					loading={createModalLoading}
				>
					Create
				</Button>
			</span>
		</div>
	);
}

export default ModalFooter;
