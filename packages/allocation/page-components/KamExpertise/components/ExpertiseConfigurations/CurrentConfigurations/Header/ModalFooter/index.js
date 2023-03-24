import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function ModalFooter({ setMode, setSelectedVersion, selectedVersion, getVersion, CreateModalLoading }) {
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
					disabled={CreateModalLoading}
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
					loading={CreateModalLoading}
				>
					Create
				</Button>
			</span>
		</div>
	);
}

export default ModalFooter;
