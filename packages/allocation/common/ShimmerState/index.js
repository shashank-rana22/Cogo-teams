import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function ShimmerState() {
	return (
		[1, 2, 3, 4, 5, 6, 7].map((loadingList) => (
			<div key={loadingList} className={styles.list_loading_state}>
				{[10, 20, 30, 40, 50].fill('').map((loadingItem) => (
					<div key={loadingItem} className={styles.list_item_loading_state}>
						<Placeholder height="12px" width="100px" margin="0px 0px 20px 0px" />
						<Placeholder height="12px" width="100px" margin="0px" />
					</div>
				))}
			</div>
		))
	);
}

export default ShimmerState;
