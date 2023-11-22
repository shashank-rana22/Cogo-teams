import { useCallback, useRef, useState } from 'react';

import useFetchGlobalRoom from '../../../../hooks/useFetchGlobalRoom';

import Footer from './Footer';
import Header from './Header';
import Messages from './Messages';
import styles from './styles.module.css';

const TIMEOUT_FOR_SCROLL = 200;

const GROUP_MEMBERS_MIN = 2;

function TeamChats(props) {
	const {
		activeTeamCard = {},
		viewType = '',
		loggedInUserId = '',
		firestore = {},
		setActiveTab = () => {},
		activeTab = {},
		listCogooneGroupMembers = () => {},
		membersList = [],
		isMobile = false,
	} = props || {};

	const conversationsDivRef = useRef(null);

	const [loadingDraft, setLoadingDraft] = useState(false);

	const { data = {}, groupData = {} } = activeTab || {};

	const {
		group_id = '',
		id = '',
	} = data || {};

	const { group_members_ids = [], last_group_updated_at = 0, is_group = false } = groupData || {};

	const isGroup = (group_members_ids?.length > GROUP_MEMBERS_MIN) || is_group;

	const hasPermissionToEdit = (id || group_id);

	const { loading = false } = useFetchGlobalRoom({
		firestore,
		globalGroupId : group_id,
		setActiveTab,
		draftRoomId   : id,
		listCogooneGroupMembers,
	});

	const scrollToLastMessage = useCallback(() => {
		setTimeout(() => {
			conversationsDivRef.current?.scrollTo({
				top      : conversationsDivRef.current.scrollHeight,
				behavior : 'smooth',
			});
		}, TIMEOUT_FOR_SCROLL);
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Header
					activeTeamCard={activeTeamCard}
					loggedInUserId={loggedInUserId}
					viewType={viewType}
					firestore={firestore}
					setActiveTab={setActiveTab}
					membersList={membersList}
					key={id}
					activeTab={activeTab}
					hasPermissionToEdit={hasPermissionToEdit}
					setLoadingDraft={setLoadingDraft}
					loadingDraft={loadingDraft}
					isMobile={isMobile}
				/>
			</div>
			<div className={styles.messages}>
				<Messages
					internalRoomId={group_id}
					firestore={firestore}
					loading={loading}
					conversationsDivRef={conversationsDivRef}
					scrollToLastMessage={scrollToLastMessage}
					isGroup={isGroup}
					lastGroupUpdatedAt={last_group_updated_at}
					loadingDraft={loadingDraft}
				/>
			</div>
			<div className={styles.footer}>
				<Footer
					hasPermissionToEdit={hasPermissionToEdit}
					activeTeamCard={activeTeamCard}
					activeTab={activeTab}
					firestore={firestore}
					internalRoomId={group_id}
					scrollToLastMessage={scrollToLastMessage}
					isMobile={isMobile}
				/>
			</div>
		</div>
	);
}

export default TeamChats;
