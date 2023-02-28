import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

function Remarks({ itemData }) {
	const { remark } = itemData || {};
	const varlength = 20;
	return (
		<div className={styles.container}>
			{remark?.length > varlength ? (
				<Tooltip interactive placement="top" content={remark}>
					<div>{`${remark.substring(0, varlength)}...`}</div>
				</Tooltip>
			) : (
				<div>{remark}</div>
			)}
		</div>
	);
}
export default Remarks;
