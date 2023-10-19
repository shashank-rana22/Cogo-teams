import {
	IcMArrowRotateRight,
	IcMArrowRotateDown,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import LoadingState from '../../LoadingState';
import GroupCard from '../GroupCard';

import styles from './styles.module.css';

function TeamsBody({
	loading = false,
	pinnedChats = [],
	unpinnedChats = [],
	activeTeamCard = {},
	loggedInAgentId = '',
	setActiveCard = () => {},
	firestore = {},
	setActiveTab = () => {},
}) {
	const [openPinnedChats, setOpenPinnedChats] = useState(true);

	const isPinnedChatEmpty = isEmpty(pinnedChats);
	const isUnpinnedEmpty = isEmpty(unpinnedChats);

	const ActiveIcon = openPinnedChats ? IcMArrowRotateDown : IcMArrowRotateRight;

	if (!loading && isPinnedChatEmpty && isUnpinnedEmpty) {
		return (
			<div className={styles.empty_state}>
				No Groups Yet...
			</div>
		);
	}

	return (
		<>
			{!isPinnedChatEmpty && (
				<>
					<div
						role="presentation"
						className={styles.pinned_chat_flex}
						onClick={() => setOpenPinnedChats((prev) => !prev)}
					>
						<ActiveIcon className={styles.icon} />
						<div className={styles.pin_text}>pinned chats</div>
					</div>

					{openPinnedChats && (
						<div className={styles.pinned_chats_div}>
							{(pinnedChats || []).map((eachRoom) => (
								<GroupCard
									eachRoom={eachRoom}
									key={eachRoom?.id}
									activeTeamCard={activeTeamCard}
									loggedInUserId={loggedInAgentId}
									setActiveCard={setActiveCard}
									firestore={firestore}
									setActiveTab={setActiveTab}
								/>
							))}
						</div>
					)}
				</>
			)}

			{!isUnpinnedEmpty ? (
				<>
					<div className={styles.recent_text}>Recent</div>
					{(unpinnedChats || []).map((eachRoom) => (
						<GroupCard
							eachRoom={eachRoom}
							key={eachRoom?.id}
							activeTeamCard={activeTeamCard}
							loggedInUserId={loggedInAgentId}
							setActiveCard={setActiveCard}
							firestore={firestore}
							setActiveTab={setActiveTab}
						/>
					))}
				</>
			) : null }

			{loading ? <LoadingState /> : null}
		</>
	);
}

export default TeamsBody;
