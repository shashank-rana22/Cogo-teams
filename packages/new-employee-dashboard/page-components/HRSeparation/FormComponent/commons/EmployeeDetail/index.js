import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

function EmployeeDetail({ KEYS_TO_DISPLAY = {} }) {
	const [show, setShow] = useState(false);
	return (
		<div className={styles.container}>
			<div className={styles.heading} aria-hidden onClick={() => setShow(!show)}>
				<span>Summary</span>
				{show ? <IcMArrowUp /> : <IcMArrowDown />}

			</div>

			{show && 	(
				<div className={styles.item_container}>
					{Object.keys(KEYS_TO_DISPLAY || {}).map((val) => (
						<div className={styles.detail} key={val.key}>
							<div className={styles.label}>
								{startCase(val) || '-'}
							</div>

							<div className={styles.employee_detail}>
								{ startCase(KEYS_TO_DISPLAY[val]) || '-'}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default EmployeeDetail;
