import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import NetworkLineChart from '../../../../configurations/network-line-chart';

import styles from './styles.module.css';

function Networks({ networkData = {} }) {
	const emptyState = isEmpty(networkData);
	return (
		<>
			<div className={styles.title}>NETWORKS</div>

			{emptyState ? (
				<div className={styles.empty_state}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.empty_image}
						alt="empty-state"
						width={120}
						height={120}
					/>

				</div>
			) : (
				<div className={styles.line_chart}>
					<NetworkLineChart networkData={networkData} />
				</div>
			)}

		</>
	);
}

export default Networks;
