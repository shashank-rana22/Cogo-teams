import { Toggle } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';

function FinanceRecommendations({ SetFinanceRecommendation, financeRecommendation }) {
	const [showNotes, setShowNotes] = useState(true);
	const toggle = (e) => {
		SetFinanceRecommendation(
			() => ({
				...financeRecommendation,
				[e.target.name]: e.target.checked,
			}),
		);
		console.log('toggle', financeRecommendation);
	};

	return (
		<div className={styles.container}>
			<div className={styles.heading} aria-hidden onClick={() => setShowNotes(!showNotes)}>
				<span>Finance Recommendation</span>
			</div>

			<div className={styles.content_container}>
				<div className={styles.hold_employee_container}>
					<Toggle
						name="employee"
						size="md"
						disabled={false}
						onLabel="Let GO Employee"
						offLabel="Hold Employee"
						value={financeRecommendation.employee}
						onChange={(e) => { toggle(e); }}
					/>
				</div>
				<div className={styles.hold_fnf_container}>
					<Toggle
						name="fnf"
						size="md"
						disabled={false}
						onLabel="Release FNF"
						offLabel="Hold FNF"
						value={financeRecommendation.fnf}
						onChange={(e) => toggle(e)}
					/>
				</div>
			</div>
		</div>
	);
}

export default FinanceRecommendations;
