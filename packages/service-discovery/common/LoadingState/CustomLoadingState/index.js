import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import DotLoader from '../DotLoader';

import styles from './styles.module.css';

function CustomLoadingState({ loadingText = 'Please Wait!' }) {
	return (
		<div className={styles.loader}>
			<div className={styles.loading_text_container}>
				<img
					src={GLOBAL_CONSTANTS.image_url.cogo_logo_without_bg}
					alt="cogoport-logo"
					width={66}
					style={{ objectFit: 'cover' }}
				/>

				<span className={styles.loading_text}>{loadingText}</span>
			</div>

			<div className={styles.dot_loader}>
				<DotLoader dotsLegth={4} />
			</div>
		</div>
	);
}

export default CustomLoadingState;
