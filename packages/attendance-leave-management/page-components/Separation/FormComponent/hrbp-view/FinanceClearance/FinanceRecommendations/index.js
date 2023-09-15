import { Toggle } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';

function FinanceRecommendations({ data = {} }) {
	const {
		hold_employee, hold_fnf,
	} = data || {};
	const [showNotes, setShowNotes] = useState(true);

	return (

		<div className={styles.container}>
			<div className={styles.heading} aria-hidden onClick={() => setShowNotes(!showNotes)}>
				<span>Finance Recommendation</span>
			</div>

			<div className={styles.content_container}>
				<div className={styles.hold_employee_container}>
					<Toggle
						name="a4"
						size="md"
						disabled
						onLabel="Let GO Employee"
						value={hold_employee}
						checked={hold_employee}
						offLabel="Hold Employee"
					/>
				</div>

				<div className={styles.hold_fnf_container}>
					<Toggle
						name="a4"
						size="md"
						disabled
						onLabel="Release FNF"
						offLabel="Hold FNF"
						value={showNotes}
						checked={hold_fnf}
						onChange={setShowNotes}
					/>
				</div>
			</div>
		</div>

	);
}

export default FinanceRecommendations;
