import useFetchGlobalRoom from '../../../../hooks/useFetchGlobalRoom';

import Footer from './Footer';
import Header from './Header';
import Messages from './Messages';
import styles from './styles.module.css';

function TeamChats(props) {
	const {
		activeTeamCard = {},
		suggestions = [],
		viewType = '',
		loggedInUserId = '',
		firestore = {},
		setActiveTab = () => {},
		activeTab = {},
	} = props || {};

	const {
		group_id = '',
		id = '',
	} = activeTeamCard || {};

	const { loading = false } = useFetchGlobalRoom({
		firestore,
		globalGroupId : group_id,
		setActiveTab,
		draftRoomId   : id,
	});

	const hasPermissionToEdit = (id || group_id);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Header
					activeTeamCard={activeTeamCard}
					loggedInUserId={loggedInUserId}
					viewType={viewType}
					firestore={firestore}
					setActiveTab={setActiveTab}
				/>
			</div>
			<div className={styles.messages}>
				<Messages
					internalRoomId={group_id}
					firestore={firestore}
					loading={loading}
				/>
			</div>
			<div className={styles.footer}>
				<Footer
					suggestions={suggestions}
					hasPermissionToEdit={hasPermissionToEdit}
					activeTeamCard={activeTeamCard}
					activeTab={activeTab}
					firestore={firestore}
				/>
			</div>
		</div>
	);
}

export default TeamChats;
