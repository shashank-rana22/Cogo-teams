import { Toggle } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';

function FinanceRecommendations({
	setFinanceRecommendation = () => {},
	financeRecommendation = {},
	confirmedValues = {},
	isComplete = false,
}) {
	const [showNotes, setShowNotes] = useState(true);
	const toggle = (e) => {
		setFinanceRecommendation(
			() => ({
				...financeRecommendation,
				[e.target.name]: e.target.checked,
			}),
		);
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
						disabled={isComplete}
						onLabel="Let GO Employee"
						offLabel="Hold Employee"
						checked={isComplete ? confirmedValues.employee : financeRecommendation.employee}
						onChange={(e) => { toggle(e); }}
					/>
				</div>
				<div className={styles.hold_fnf_container}>
					<Toggle
						name="fnf"
						size="md"
						disabled={isComplete}
						onLabel="Release FNF"
						offLabel="Hold FNF"
						checked={isComplete ? confirmedValues.fnf : financeRecommendation.fnf}
						onChange={(e) => { toggle(e); }}
					/>
				</div>
			</div>
		</div>
	);
}

export default FinanceRecommendations;
