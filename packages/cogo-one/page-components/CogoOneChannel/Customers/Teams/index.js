import React, { useState } from 'react';

import useFetchTeamsRoom from '../../../../hooks/useFetchTeamsRoom';
import useUpdateLocalTeamRooms from '../../../../hooks/useUpdateLocalTeamRooms';

import styles from './styles.module.css';
import TeamsBody from './TeamsBody';
import TeamsHeader from './TeamsHeader';

function Teams(teamsProps) {
	const {
		firestore = {},
		setActiveTeamCard = () => {},
		activeTeamCard = {},
		loggedInAgentId = '',
		setActiveTab = () => {},
	} = teamsProps;

	const [searchValue, setSearchValue] = useState('');

	const {
		unpinnedChats = [],
		handleScroll,
		pinnedChats = [],
		loading,
	} = useFetchTeamsRoom({ firestore, searchValue });
	const { readTeamsMessage = () => {} } = useUpdateLocalTeamRooms({ firestore });

	const setActiveCard = (card) => {
		readTeamsMessage({ localRoomId: card?.id });
		setActiveTeamCard(card);
	};

	return (
		<div className={styles.container}>
			<TeamsHeader
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				setActiveTeamCard={setActiveTeamCard}
			/>
			<div
				className={styles.list_container}
				onScroll={handleScroll}
			>
				<TeamsBody
					loading={loading}
					pinnedChats={pinnedChats}
					unpinnedChats={unpinnedChats}
					activeTeamCard={activeTeamCard}
					loggedInAgentId={loggedInAgentId}
					setActiveCard={setActiveCard}
					firestore={firestore}
					setActiveTab={setActiveTab}
				/>
			</div>
		</div>

	);
}

export default Teams;
