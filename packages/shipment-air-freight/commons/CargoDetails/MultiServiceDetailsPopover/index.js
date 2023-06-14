import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import RenderCargoPills from '../RenderCargoPills';

import styles from './styles.module.css';

const MAIN_SERVICES_MIN_LENGTH = 1;

function MultiServiceDetailsPopover({
	children = null,
	mainServices = [],

}) {
	if (mainServices?.length <= MAIN_SERVICES_MIN_LENGTH) {
		return null;
	}

	const renderBody = () => (
		mainServices.map((item, idx) => (idx !== GLOBAL_CONSTANTS.zeroth_index ? (
			<div className={styles.container} key={item.id}>
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
