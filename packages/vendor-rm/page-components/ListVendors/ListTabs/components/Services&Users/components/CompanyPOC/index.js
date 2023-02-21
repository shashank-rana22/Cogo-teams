/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import { IcMEdit } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function CompanyPOC() {
	const obj = 	[
		{ label: 'Name', value: 'Chandrashekhar Na...' },
		{ label: 'Email ID', value: 'chandrashekhar@ab...' },
		{ label: 'Mobile Number', value: '+91 8383929900' },
		{ label: 'Role in the Company', value: 'Finance Head' },
	];

	return (
		<div className={styles.main}>
			<span className={styles.heading}>Company POC </span>
			<div className={styles.cont}>
				{obj.map((item) => (
					<div className={styles.box_info}>
						<div>
							<div className={styles.top}>
								{item.label}
							</div>
							<div className={styles.bottom}>
								{item.value}
							</div>
						</div>

						{item.label === 'Role in the Company' ? <button className={styles.btn}><IcMEdit /></button> : ''}

					</div>
				)) }

			</div>

			<hr className={styles.dis} />

		</div>
	);
}

export default CompanyPOC;
