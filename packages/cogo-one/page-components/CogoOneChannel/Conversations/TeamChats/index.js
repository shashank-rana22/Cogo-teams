import Header from './Header';
import styles from './styles.module.css';

function TeamChats({ activeTeamCard = {} }) {
	console.log('activeTeamCard:', activeTeamCard);
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Header />
			</div>
			<div className={styles.message_container}>
				hello
			</div>
		</div>
	);
}

export default TeamChats;
