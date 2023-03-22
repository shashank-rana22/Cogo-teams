import { Tooltip } from '@cogoport/components';
import React from 'react';

import RenderCargoPills from '../RenderCargoPills';

import styles from './styles.module.css';

function MultiServiceDetailsPopover({
	children,
	mainServices,

}) {
	if (mainServices?.length <= 1) {
		return null;
	}

	const renderBody = () => (
		mainServices?.map((item, idx) => (idx !== 0 ? (
			<div className={styles.container}>
				<RenderCargoPills detail={item} />
			</div>
		) : null)));

	return (
		<Tooltip
			theme="light"
			placement="bottom"
			interactive
			content={renderBody()}
		>
			<div
				style={{
					background : 'none',
					padding    : 0,
					color      : '#366EFD',
					border     : 'none',
					height     : 'auto',
					fontSize   : '12px',
				}}
			>
				{children}
			</div>

		</Tooltip>
	);
}
export default MultiServiceDetailsPopover;
