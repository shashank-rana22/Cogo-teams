import Header from './Header';
import styles from './styles.module.css';

function VoiceCall({ activeVoiceCard = {} }) {
	return (
		<div className={styles.container}>
			<Header />
		</div>

	);
}

export default VoiceCall;
