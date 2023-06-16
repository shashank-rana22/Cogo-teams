import { Tooltip } from '@cogoport/components';
import React from 'react';

import RenderCargoPills from '../RenderCargoPills';

import styles from './styles.module.css';

const MAIN_SERVICES_MIN_LENGTH = 1;
const CHECK_FIRST_ITEM_OF_PACKAGE = 0;

function MultiServiceDetailsPopover({
	children = null,
	mainServices = [],

}) {
	if (mainServices?.length <= MAIN_SERVICES_MIN_LENGTH) {
		return null;
	}

	const renderBody = () => (
		mainServices.map((item, idx) => (idx !== CHECK_FIRST_ITEM_OF_PACKAGE ? (
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
