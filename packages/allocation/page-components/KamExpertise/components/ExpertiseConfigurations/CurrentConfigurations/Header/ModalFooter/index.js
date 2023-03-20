import { Toast, Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function ModalFooter({ setMode, setShowModal, setSelectedVersion, selectedVersion }) {
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
					themeType="teritiary"
					className={styles.button}
					onClick={() => {
						setMode('');
						setSelectedVersion('');
					}}
				>
					Back
				</Button>
				<Button
					className={styles.button}
					disabled={!selectedVersion}
					onClick={() => {
						setShowModal(false);
						setMode('');
						Toast.success('Version Selected');
					}}
				>
					Create
				</Button>
			</span>
		</div>
	);
}

export default ModalFooter;
