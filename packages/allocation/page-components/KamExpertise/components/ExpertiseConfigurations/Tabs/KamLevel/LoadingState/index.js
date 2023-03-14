import { Placeholder, Collapse } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

function LoadingState() {
	const COLUMN_MAPPING = [
		{
			label: 'Customer Expertise',
		},
		{
			label: 'Trade Expertise',
		},
		{
			label: 'Commodity Expertise',
		},
		{
			label: 'Misc Expertise',
		},
	];
	const options = [
		{
			key      : '1',
			children : '',
			title:
	<div className={styles.whole}>
		<div style={{
			width          : '100%',
			display        : 'flex',
			justifyContent : 'space-between',
			alignItems     : 'center',
		}}
		>
			<div className={styles.text}>
				<div style={{ marginRight: '8px' }}>KAM</div>
				<b>
					<Placeholder width="30px" height="30px" />
				</b>
				<IcMArrowNext className={styles.arrow} />
				<b><Placeholder width="30px" height="30px" /></b>
			</div>
		</div>
		<div className={styles.score_container}>
			{COLUMN_MAPPING.map((item) => (
				<div className={styles.list_item}>
					<div className={styles.label_text}>
						{startCase(item.label)}
						{' '}
						Score
					</div>
					<div style={{ fontWeight: '700' }}>
						<Placeholder width="50px" height="20px" />
					</div>
				</div>
			))}
		</div>
	</div>,

		},

	];
	const [value, onChange] = useState('');

	return (
		<Collapse
			panel={options}
			activeKey={value}
			setActive={onChange}
			type="text"
		/>
	);
}

export default LoadingState;
