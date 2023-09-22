import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import styles from './styles.module.css';

function ImpressiveConfetti() {
	return (
		<div className={styles.container}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.confetti}
				alt="Confetti"
				width={500}
				height={400}
				className={styles.confetti_img}
			/>

			<div className={styles.overlay_text}>IMPRESSIVE!</div>

		</div>
	);
}

export default ImpressiveConfetti;
