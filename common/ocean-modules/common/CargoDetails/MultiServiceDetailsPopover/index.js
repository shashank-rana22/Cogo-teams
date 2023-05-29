import { Tooltip } from '@cogoport/components';
import { useMemo } from 'react';

import RenderCargoPills from '../RenderCargoPills';

import styles from './styles.module.css';

function MultiServiceDetailsPopover({
	children = {},
	mainServices = [],
}) {
	const keysForServices = useMemo(
		() => Array(mainServices.length).fill(null).map(() => Math.random()),
		[mainServices.length],
	);

	if (mainServices?.length <= 1) {
		return null;
	}

	const renderBody = () => (
		mainServices?.map((item, idx) => (idx !== 0 ? (
			<div className={styles.container} key={keysForServices[idx]}>
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
