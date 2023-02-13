import Header from './Header';
import MessageConversations from './MessageConversations';
import styles from './styles.module.css';

function Conversations() {
	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.message_container}><MessageConversations /></div>
		</div>

	);
}

export default Conversations;
