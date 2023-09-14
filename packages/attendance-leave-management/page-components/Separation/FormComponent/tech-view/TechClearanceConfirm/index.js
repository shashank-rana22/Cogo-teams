import { Tags } from '@cogoport/components';
import { IcMFtick } from '@cogoport/icons-react';
import React, { useState } from 'react';

import TechStatus from '../TechClearance/TechStatus';

import styles from './styles.module.css';

const options = [
	{
		key      : '1',
		disabled : false,
		children : 'Completed',
		prefix   : null,
		suffix   : null,
		color    : '#849E4C',
		tooltip  : false,
	},
];

function TechClearanceConfirm() {
	const [items, setItems] = useState(options);

	return (

		<div>
			<div className={styles.container}>
				<div className={styles.sub_container}>
					<div className={styles.title}>ACCESS REMOVAL</div>
					<div className={styles.sub_heading}>Check the boxes after removal of access</div>
				</div>

				<Tags items={items} onItemsChange={setItems} size="xl" className={styles.completed} />

			</div>

			<div className={styles.completed_notification_container}>

				<IcMFtick height="18px" width="18px" color="#849E4C" />

				<div className={styles.completed_notification_text}>
					You have successfully completed your tasks. No further changes are allowed
				</div>

			</div>
			<TechStatus />
		</div>
	);
}

export default TechClearanceConfirm;
