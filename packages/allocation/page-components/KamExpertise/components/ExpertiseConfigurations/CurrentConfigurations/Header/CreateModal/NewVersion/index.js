import { Button } from '@cogoport/components';
import { IcMAlert } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function NewVersion(props) {
	const { setMode, setSelectedVersion, getVersion, createModalLoading } = props;

	return (
		<div className={styles.container}>
			<IcMAlert className={styles.alert_icon} />

			<div className={styles.supporting_text}>
				Creating a new version will overwrite the existing saved draft.
			</div>

			<div className={styles.supporting_text}>
				Do you wish to proceed?
			</div>
			<div className={styles.button_container}>
				<Button
					themeType="tertiary"
					disabled={createModalLoading}
					onClick={() => { setMode('initial-mode'); }}
				>
					Back

				</Button>

				<Button
					loading={createModalLoading}
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
