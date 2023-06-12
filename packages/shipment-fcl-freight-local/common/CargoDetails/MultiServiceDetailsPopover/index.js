import { Tooltip } from '@cogoport/components';

import RenderCargoPills from '../RenderCargoPills';

import styles from './styles.module.css';

const INITIAL_STATE = 1;
const DEFAULT_VALUE = 0;

function MultiServiceDetailsPopover({
	children,
	mainServices,

}) {
	if (mainServices?.length <= INITIAL_STATE) {
		return null;
	}

	const renderBody = () => (
		mainServices?.map((item, idx) => (idx !== DEFAULT_VALUE ? (
			<div className={styles.container} key={item?.id}>
				<RenderCargoPills
					detail={item}
				/>
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
