import { Toast, Button } from '@cogoport/components';
import { IcMAlert } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function NewVersion({ setMode, setShowModal, setSelectedVersion }) {
	return (

		<div className={styles.container}>

			<IcMAlert className={styles.alert_icon} />

			<div style={{ color: '#bf291e' }} className={styles.supporting_text}>
				Creating a new version will overwrite the existing saved draft.
			</div>

			<div className={styles.supporting_text}>
				Do you wish to proceed?
			</div>
			<div className={styles.button_container}>
				<Button themeType="teritiary" onClick={() => { setMode('initial-mode'); }}>Back</Button>
				<Button onClick={() => {
					setSelectedVersion('new-version');
					setShowModal(false);
					setMode('initial-mode');
					Toast.success('New Draft Loaded');
				}}
				>
					Proceed

				</Button>

			</div>

		</div>

	);
}

export default NewVersion;
