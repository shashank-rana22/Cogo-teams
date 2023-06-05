import { Tooltip } from '@cogoport/components';
import React from 'react';

import RenderCargoPills from '../RenderCargoPills';

import styles from './styles.module.css';

function MultiServiceDetailsPopover({
<<<<<<<< HEAD:packages/shipment-fcl-custom/common/CargoDetails/MultiServiceDetailsPopover/index.js
	children,
	mainServices,

========
	children = {},
	mainServices = [],
>>>>>>>> new_ftl_ltl:packages/shipment-ltl-freight/common/CargoDetails/MultiServiceDetailsPopover/index.js
}) {
	if (mainServices?.length <= 1) {
		return null;
	}

	const renderBody = () => (
		mainServices.map((item, idx) => (idx !== 0 ? (
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
