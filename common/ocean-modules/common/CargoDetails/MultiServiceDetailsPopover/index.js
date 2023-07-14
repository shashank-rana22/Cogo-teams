import { Tooltip } from '@cogoport/components';
import { useMemo } from 'react';

import RenderCargoPills from '../RenderCargoPills';

import styles from './styles.module.css';

const MIN_MAIN_SERVICE_LENGTH = 1;
const MAIN_SERVICE_FIRST_INDEX = 0;

function MultiServiceDetailsPopover({
	children = null,
	mainServices = [],
}) {
	const keysForServices = useMemo(
		() => Array(mainServices.length).fill(null).map(() => Math.random()),
		[mainServices.length],
	);

	if (mainServices?.length <= MIN_MAIN_SERVICE_LENGTH) {
		return null;
	}

	const renderBody = () => (
		mainServices?.map((item, idx) => (idx !== MAIN_SERVICE_FIRST_INDEX ? (
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
