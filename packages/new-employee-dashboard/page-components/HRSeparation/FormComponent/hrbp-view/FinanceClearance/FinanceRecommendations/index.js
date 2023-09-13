import { Toggle } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';

function FinanceRecommendations() {
	const [showNotes, setShowNotes] = useState(true);

	return (

		<div className={styles.container}>
			<div className={styles.heading} aria-hidden onClick={() => setShowNotes(!showNotes)}>
				<span>Finance Recommendation</span>
			</div>

			<div className={styles.content_container}>
				<div className={styles.hold_employee_container}>
					<Toggle name="a4" size="md" disabled={false} onLabel="Let GO Employee" offLabel="Hold Employee" />
				</div>

				<div className={styles.hold_fnf_container}>
					<Toggle name="a4" size="md" disabled={false} onLabel="Release FNF" offLabel="Hold FNF" />
				</div>
			</div>
		</div>

	);
}

export default FinanceRecommendations;
