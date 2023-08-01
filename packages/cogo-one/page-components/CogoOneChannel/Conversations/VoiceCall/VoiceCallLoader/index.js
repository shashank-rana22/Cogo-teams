import { VOICE_CALL_LOADER } from '../../../../../constants';

import styles from './styles.module.css';

function VoiceCallLoader() {
	return (
		<div className={styles.loader}>
			<img
				src={VOICE_CALL_LOADER.loader}
				alt="load"
			/>
		</div>
	);
}

export default VoiceCallLoader;
