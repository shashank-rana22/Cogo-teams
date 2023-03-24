import { Button } from '@cogoport/components';
import { IcMAlert } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function NewVersion({ setMode, setSelectedVersion, getVersion, CreateModalLoading }) {
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
				<Button
					themeType="teritiary"
					disabled={CreateModalLoading}
					onClick={() => { setMode('initial-mode'); }}
				>
					Back

				</Button>
				<Button
					loading={CreateModalLoading}
					onClick={() => {
						setSelectedVersion('new');
						getVersion();
					}}
				>
					Proceed

				</Button>

			</div>

		</div>

	);
}

export default NewVersion;
