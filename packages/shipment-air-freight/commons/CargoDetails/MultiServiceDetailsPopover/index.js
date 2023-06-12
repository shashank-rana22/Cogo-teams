import CONSTANTS from '@cogoport/air-modules/constants/CONSTANTS';
import { Tooltip } from '@cogoport/components';
import React from 'react';

import RenderCargoPills from '../RenderCargoPills';

import styles from './styles.module.css';

const { ZEROTH_INDEX, NON_EMPTY_LIST_LENGTH } = CONSTANTS;

function MultiServiceDetailsPopover({
	children = null,
	mainServices,

}) {
	if (mainServices?.length <= NON_EMPTY_LIST_LENGTH) {
		return null;
	}

	const renderBody = () => (
		mainServices?.map((item, idx) => (idx !== ZEROTH_INDEX ? (
			<div className={styles.container} key={item?.id}>
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
			<div className={styles.tooltip_customise}>
				{children}
			</div>
		</Tooltip>
	);
}
export default MultiServiceDetailsPopover;
