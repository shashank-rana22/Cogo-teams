import { Button, Tags } from '@cogoport/components';
import { IcMTaskCompleted, IcCFtick, IcMClock } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function Heading({
	title = 'HR MEETING', subTitle = 'Summary from manager interaction',
	isComplete = false, name = '',
}) {
	const options = [
		{
			key      : '1',
			disabled : false,
			children : isComplete ? 'Completed' : 'Pending',
			color    : isComplete ? 'green' : 'orange',
			tooltip  : false,
		},
	];
	const [items, setItems] = useState(options);

	return (
		<>
			<div className={styles.header}>
				<div className={styles.left_header}>
					<span className={styles.upper_text}>{title}</span>
					<span className={styles.lower_text}>{subTitle}</span>
				</div>
				<div className={styles.logs_button}>
					<Tags items={items} onItemsChange={setItems} size="xl" />
					<Button size="md" themeType="accent">
						<IcMTaskCompleted />
						<span style={{ marginLeft: '4px' }}>Notes & Logs</span>
					</Button>
				</div>
			</div>

			<div className={styles.sub_heading}>
				{isComplete ? <IcCFtick width={20} height={20} />
					: <IcMClock width={20} height={20} style={{ color: '#F68B21' }} />}
				<span style={{ marginLeft: '10px' }}>
					{isComplete ? `Cleared by ${name}`
						: `Awaiting clearance from ${name}`}
				</span>
			</div>

		</>
	);
}

export default Heading;
