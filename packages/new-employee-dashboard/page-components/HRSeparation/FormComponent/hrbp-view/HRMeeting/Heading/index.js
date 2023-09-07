import { Button, Tags } from '@cogoport/components';
import { IcMTaskCompleted, IcCFtick } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

const options = [
	{
		key      : '1',
		disabled : false,
		children : 'Completed',
		color    : 'green',
		tooltip  : false,
	},
];
function Heading({ title = 'HR MEETING', subTitle = 'Summary from manager interaction' }) {
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
				<IcCFtick width={20} height={20} />
				<span style={{ marginLeft: '10px' }}>Cleared by Person/Team Name</span>
			</div>

		</>
	);
}

export default Heading;
