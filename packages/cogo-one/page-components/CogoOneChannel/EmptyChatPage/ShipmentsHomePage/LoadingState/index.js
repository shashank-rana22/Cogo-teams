import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const LOADING_STATE_CARD_COUNT = 6;

function LoadingState() {
	return ([...Array(LOADING_STATE_CARD_COUNT).keys()].map(
		(item) => (
			<div key={item} className={styles.container}>
				<div className={styles.apply_all}>
					<Placeholder height="30px" width="160px" margin="0px 10px 0px 0px" />
					<Placeholder height="30px" width="60px" />
				</div>
				<div className={styles.apply_all}>
					<Placeholder type="circle" radius="60px" margin="4px 0px 0px 0px" />
					<Placeholder height="20px" width="150px" margin="4px 0px 0px 0px" />
				</div>
				<div className={styles.apply_all}>
					<Placeholder height="30px" width="110px" margin="10px 10px 0px 0px" />
					<Placeholder height="30px" width="110px" margin="10px 0px 0px 0px" />
				</div>
				<div className={styles.apply_all}>
					<Placeholder height="30px" margin="4px 10px 0px 10px" />

				</div>
				<div className={styles.net_value}>
					<Placeholder height="30px" width="140px" margin="4px 10px 0px 0px" />
				</div>
				<div className={styles.net_value}>
					<Placeholder height="20px" margin="4px 10px 0px 10px" />
				</div>
			</div>
		),
	)

	);
}

export default LoadingState;
