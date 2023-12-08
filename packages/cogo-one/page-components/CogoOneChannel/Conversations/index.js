import styles from './styles.module.css';
import TeamChats from './TeamChats';

const CONVERSATION_COMPONENT_MAPPING = {
	teams: TeamChats,
};

function Conversations({
	activeTab = {},
	firestore = {},
	userId = '',
	viewType = '',
	setActiveTab = () => {},
	suggestions = [],
	listCogooneGroupMembers = () => {},
	membersList = [],
	isMobile = false,
}) {
	const componentPropsMapping = {
		teams: {
			activeTeamCard : activeTab?.data || {},
			suggestions,
			loggedInUserId : userId,
			firestore,
			setActiveTab,
			activeTab,
			listCogooneGroupMembers,
			membersList,
		},
	};

	const Component = CONVERSATION_COMPONENT_MAPPING[activeTab?.tab] || null;

	if (!Component) {
		return null;
	}

	return (
		<div className={styles.container}>
			<Component
				key={activeTab?.tab}
				viewType={viewType}
				isMobile={isMobile}
				{...(componentPropsMapping[activeTab?.tab] || {})}
			/>
		</div>
	);
}

export default Conversations;
