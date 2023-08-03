import { Image } from '@cogoport/next';

import { VOICE_CALL_LOADER } from '../../../../../constants';

import styles from './styles.module.css';

function VoiceCallLoader() {
	return (
		<div className={styles.loader}>
			<Image
				src={VOICE_CALL_LOADER.loader}
				alt="load"
				width={15}
				height={15}
			/>
		</div>
	);
}

export default VoiceCallLoader;
