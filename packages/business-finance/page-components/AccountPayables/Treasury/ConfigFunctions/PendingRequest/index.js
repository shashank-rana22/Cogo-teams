import { Popover } from '@cogoport/components';

import styles from './styles.module.css';
import UpdatedAmount from './UpdatedAmount';

function PendingRequest({ itemData = {} }) {
	const { pendingRequestsCount, fundRequests, currency } = itemData;

	return (
		<div>
			{pendingRequestsCount ? (
				<Popover
					placement="bottom-start"
					trigger="mouseenter"
					interactive
					content={
						<UpdatedAmount fundRequests={fundRequests} currency={currency} />
					}
				>

					<div className={styles.container}>
						<div className={styles.text}>{pendingRequestsCount}</div>
					</div>

				</Popover>
			) : null}
		</div>
	);
}
export default PendingRequest;
