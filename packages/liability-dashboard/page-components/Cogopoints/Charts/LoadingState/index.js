import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import styles from './styles.module.css';

function ChartLoadingState() {
	return (
		<div className={styles.container}>
			<div className={styles.line_chart}>
				<Placeholder height="100%" width="100%">
					<Image
						width={100}
						height={100}
						src={GLOBAL_CONSTANTS.image_url.line_chart_img}
						alt="timer"
					/>
				</Placeholder>
			</div>
			<div className={styles.pie_chart}>
				<Placeholder height="100%" width="100%">
					<Image
						width={100}
						height={100}
						src={GLOBAL_CONSTANTS.image_url.pie_chart_img}
						alt="timer"
					/>
				</Placeholder>
			</div>
		</div>
	);
}

export default ChartLoadingState;
