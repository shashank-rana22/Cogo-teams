import { Tooltip, Grid } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import styles from '../styles.module.css';

// //const { Col } = Grid;

function Field({ field }) {
	const stylesCol = {
		display    : 'flex',
		alignItems : 'center',
		padding    : '0 4px',
	};

	return (
		<Col
			xs={field.span}
			sm={field.span}
			md={field.span}
			lg={field.span}
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
		</Col>
	);
}
export default Field;
