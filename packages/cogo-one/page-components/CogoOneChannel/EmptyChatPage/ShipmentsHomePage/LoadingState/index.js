import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import styles from './styles.module.css';

function LoadingState() {
	return (
		<div className={styles.wrap}>
			<div className={styles.animation_loader}>
				<div className={styles.ship}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.cargo_ship_vector}
						height={180}
						width={300}
					/>
				</div>

				<div className={styles.line} />
				<div className={styles.line1} />
				<div className={styles.line2} />
				<div className={styles.line3} />
				<div className={styles.line4} />
				<div className={styles.line5} />
				<div className={styles.line6} />
				<div className={styles.line7} />
			</div>
		</div>
	);
}

export default LoadingState;
