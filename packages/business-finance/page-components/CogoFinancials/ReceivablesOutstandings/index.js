import React from 'react';

import MyResponsiveBar from '../Common/ResponsiveBar';

import styles from './styles.module.css';

function ReceivablesOutstandings() {
	const data = [
		{
			Duration : '06-11-2023 to 06-11-2023',
			sandwich : 24,
			fries    : 57,
		},
		{
			Duration : '07-11-2023 to 08-11-2023',
			sandwich : 190,
			fries    : 91,
		},
		{
			Duration : '08-11-2023 to 09-11-2023',
			sandwich : 99,
			fries    : 155,
		},
		{
			Duration : '09-11-2023 to 10-11-2023',
			sandwich : 97,
			fries    : 181,
		},
		{
			Duration : '11-11-2023 to 12-11-2023',
			sandwich : 41,
			fries    : 22,
		},
		{
			Duration : '12-11-2023 to 13-11-2023',
			sandwich : 121,
			fries    : 88,
		},
		{
			Duration : '13-11-2023 to 14-11-2023',
			sandwich : 133,
			fries    : 157,
		},
	];

	return (
		<div className={styles.container}>
			<MyResponsiveBar data={data} />
		</div>
	);
}

export default ReceivablesOutstandings;
