import { Tooltip } from '@cogoport/components';

import RenderCargoPills from '../RenderCargoPills';

import styles from './styles.module.css';

const IS_EMPTY = 1;
const IDX_LIMIT_FOR_MAIN_SERVICES = 0;

function MultiServiceDetailsPopover({
	children,
	mainServices,

}) {
	if (mainServices?.length <= IS_EMPTY) {
		return null;
	}

	const renderBody = () => (
		mainServices?.map((item, idx) => (idx !== IDX_LIMIT_FOR_MAIN_SERVICES ? (
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
