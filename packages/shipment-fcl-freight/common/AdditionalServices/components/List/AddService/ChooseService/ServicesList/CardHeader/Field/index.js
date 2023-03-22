import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import styles from '../styles.module.css';

function Field({ field }) {
	const stylesCol = {
		display    : 'flex',
		alignItems : 'center',
		padding    : '0 4px',
	};

	return (
		<div
			style={field.hasStyle ? field.styles : stylesCol}
			key={field?.key || field?.label}
		>
			<div className={styles.card_title}>
				{field.tooltip ? (
					<Tooltip theme="light" content={field.tooltip} placement="top">
						<span>
							{field.label}
							<IcMInfo />
						</span>
					</Tooltip>
				) : (
					field.label
				)}
			</div>
		</div>
	);
}
export default Field;
