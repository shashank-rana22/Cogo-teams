import { Input, Button } from '@cogoport/components';
import { IcMAlert } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function NewVersion(props) {
	const { setMode, onCreate, createModalLoading, versionName, setVersionName } = props;

	return (
		<div className={styles.container}>
			<IcMAlert className={styles.alert_icon} />

			<Input
				size="sm"
				placeholder="Enter a Version Name"
				style={{ width: '75%' }}
				value={versionName}
				onChange={(value) => { setVersionName(value); }}
			/>

			<div className={styles.supporting_text}>
				Creating a new version will overwrite the existing saved draft.
			</div>

			<div className={styles.button_container}>
				<Button
					themeType="tertiary"
					disabled={createModalLoading}
					onClick={() => {
						setMode('initial-mode');
					}}
					style={{ marginRight: '16px' }}
				>
					Back
				</Button>

				<Button
					disabled={isEmpty(versionName)}
					loading={createModalLoading}
					onClick={() => {
						onCreate();
					}}
				>
					Proceed
				</Button>
			</div>

		</div>

	);
}

export default NewVersion;
