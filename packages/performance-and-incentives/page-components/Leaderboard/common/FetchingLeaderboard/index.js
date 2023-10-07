import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import styles from './styles.module.css';

function FetchingLeaderboard() {
	return (
		<div className={styles.loader_container}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.network_loader}
				alt="Loading"
				width={160}
				height={160}
			/>

			<div className={styles.loading_text}>
				<h2>Calculating Scores...</h2>
				<p>Keep Calm, while we fetch your Activities</p>
			</div>
		</div>

	);
}

export default FetchingLeaderboard;
