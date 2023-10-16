import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

function LoadingState() {
	return (
		<div className={styles.container}>
			<div className={styles.location}>
				<Placeholder height="25px" width="200px" margin="0px 0px 8px 0px" />
				<Placeholder height="25px" width="150px" />
			</div>

			<img
				src={GLOBAL_CONSTANTS.image_url.wider_arrow}
				alt="arrow"
				className={styles.icon}
			/>

			<div className={styles.location}>
				<Placeholder height="25px" width="200px" margin="0px 0px 8px 0px" />
				<Placeholder height="25px" width="150px" />
			</div>
		</div>
	);
}

export default LoadingState;
