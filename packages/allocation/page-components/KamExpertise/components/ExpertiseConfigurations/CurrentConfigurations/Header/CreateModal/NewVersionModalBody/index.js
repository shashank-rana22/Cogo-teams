import { Button } from '@cogoport/components';
import { IcMTick, IcMAlert } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function NewVersionModalBody({ setMode }) {
	const [proceed, setProceed] = useState(false);
	if (proceed) {
		return (
			<div className={styles.container}>

				<IcMTick className={styles.tick_icon} />

				<div className={styles.supp_text}>
					New draft created
				</div>
			</div>

		);
	}

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
				<Button themeType="teritiary" onClick={() => { setMode(''); }}>Back</Button>
				<Button onClick={() => { setProceed(true); }}>Proceed</Button>

			</div>

		</div>

	);
}

export default NewVersionModalBody;
