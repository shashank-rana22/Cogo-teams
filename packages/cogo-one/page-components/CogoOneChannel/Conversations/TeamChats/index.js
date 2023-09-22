import Footer from './Footer';
import Header from './Header';
import styles from './styles.module.css';

function TeamChats(props) {
	const { activeTeamCard = {}, suggestions = [] } = props || {};
	console.log('activeTeamCard:', activeTeamCard);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Header />
			</div>
			<div className={styles.message_container}>
				<div className={styles.messages}>
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
					Hello
					<br />
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
