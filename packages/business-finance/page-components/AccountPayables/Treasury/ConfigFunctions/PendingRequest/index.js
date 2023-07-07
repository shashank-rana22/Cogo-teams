import { Popover } from '@cogoport/components';

import styles from './styles.module.css';
import UpdatedAmount from './UpdatedAmount';

const CHECK_PENDING_COUNT = 0;

function PendingRequest({ itemData = {} }) {
	const { pendingRequestsCount, fundRequests, currency } = itemData;

	return (
		<div>
			{pendingRequestsCount > CHECK_PENDING_COUNT && (
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
			)}
		</div>
	);
}
export default PendingRequest;
