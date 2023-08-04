import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import styles from './styles.module.css';

function VoiceCallLoader() {
	return (
		<div className={styles.loader}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.voice_call_loader}
				alt="load"
				width={15}
				height={15}
			/>
		</div>
	);
}

export default VoiceCallLoader;
