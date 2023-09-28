import { useCallback, useRef } from 'react';

import useFetchGlobalRoom from '../../../../hooks/useFetchGlobalRoom';

import Footer from './Footer';
import Header from './Header';
import Messages from './Messages';
import styles from './styles.module.css';

const TIMEOUT_FOR_SCROLL = 200;

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

	const conversationsDivRef = useRef(null);

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

	const scrollToLastMessage = useCallback(() => {
		setTimeout(() => {
			conversationsDivRef.current?.scrollTo({
				top      : conversationsDivRef.current.scrollHeight,
				behavior : 'smooth',
			});
		}, TIMEOUT_FOR_SCROLL);
	}, []);

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
					conversationsDivRef={conversationsDivRef}
					scrollToLastMessage={scrollToLastMessage}
				/>
			</div>
			<div className={styles.footer}>
				<Footer
					suggestions={suggestions}
					hasPermissionToEdit={hasPermissionToEdit}
					activeTeamCard={activeTeamCard}
					activeTab={activeTab}
					firestore={firestore}
					internalRoomId={group_id}
					scrollToLastMessage={scrollToLastMessage}
					draftRoomId={id}
				/>
			</div>
		</div>
	);
}

export default TeamChats;
