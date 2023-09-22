import Footer from './Footer';
import Header from './Header';
import Messages from './Messages';
import styles from './styles.module.css';

function TeamChats(props) {
	const { activeTeamCard = {}, suggestions = [], viewType = '' } = props || {};
	console.log('activeTeamCard:', activeTeamCard);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Header viewType={viewType} />
			</div>
			<div className={styles.message_container}>
				<div className={styles.messages}>
					<Messages />
				</div>
				<div className={styles.footer}>
					<Footer
						suggestions={suggestions}
					/>
				</div>
			</div>
		</div>
	);
}

export default TeamChats;
