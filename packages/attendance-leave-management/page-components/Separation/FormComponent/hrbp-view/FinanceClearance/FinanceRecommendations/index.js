import { Toggle } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';

function FinanceRecommendations({ data = {} }) {
	const {
		hold_employee,
	} = data || {};
	const [showNotes, setShowNotes] = useState(true);

	console.log({ showNotes });

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
						disabled={false}
						onLabel="Let GO Employee"
						value={hold_employee}
						onChange={setShowNotes}
						offLabel="Hold Employee"
					/>
				</div>

				<div className={styles.hold_fnf_container}>
					<Toggle
						name="a4"
						size="md"
						disabled={false}
						onLabel="Release FNF"
						offLabel="Hold FNF"
						value={showNotes}
						onChange={setShowNotes}
					/>
				</div>
			</div>
		</div>

	);
}

export default FinanceRecommendations;
