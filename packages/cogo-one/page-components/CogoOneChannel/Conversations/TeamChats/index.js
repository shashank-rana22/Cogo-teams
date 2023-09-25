import Footer from './Footer';
import Header from './Header';
import Messages from './Messages';
import styles from './styles.module.css';

function TeamChats(props) {
	const { activeTeamCard = {}, suggestions = [], viewType = '', loggedInUserId = '' } = props || {};

	const {
		internal_room_id = '',
	} = activeTeamCard || {};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Header
					activeTeamCard={activeTeamCard}
					loggedInUserId={loggedInUserId}
					viewType={viewType}
				/>
			</div>
			<div className={styles.messages}>
				<Messages internalRoomId={internal_room_id} />
			</div>
			<div className={styles.footer}>
				<Footer
					suggestions={suggestions}
				/>
			</div>
		</div>
	);
}

export default TeamChats;
