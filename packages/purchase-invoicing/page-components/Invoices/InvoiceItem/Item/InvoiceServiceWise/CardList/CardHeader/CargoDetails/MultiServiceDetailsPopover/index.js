import { Tooltip } from '@cogoport/components';

import RenderCargoPills from '../RenderCargoPills';

import styles from './styles.module.css';

const ONE = 1;
const ZERO = 0;

function MultiServiceDetailsPopover({
	children = {},
	mainServices = [],
}) {
	if (mainServices?.length <= ONE) {
		return null;
	}

	const RenderBody = () => (
		(mainServices || []).map((item, idx) => (idx !== ZERO ? (
			<div className={styles.container} key={item?.id}>
				<RenderCargoPills detail={item} />
			</div>
		) : null)));

	return (
		<Tooltip
			theme="light"
			placement="bottom"
			interactive
			content={(<RenderBody />)}
		>
			<div className={styles.tooltip_customise}>
				{children}
			</div>

		</Tooltip>
	);
}
export default MultiServiceDetailsPopover;
