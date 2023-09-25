import React, { useState } from 'react';

import useFetchTeamsRoom from '../../../../hooks/useFetchTeamsRoom';

import CreateTeam from './CreateTeam';
import styles from './styles.module.css';
import TeamsBody from './TeamsBody';
import TeamsHeader from './TeamsHeader';

function Teams(teamsProps) {
	const { firestore = {}, setActiveTeamCard = () => {} } = teamsProps;

	const [searchValue, setSearchValue] = useState('');

	const {
		unpinnedChats = [],
		// handleScroll, // add  on scroll
		pinnedChats = [],
		loading,
	} = useFetchTeamsRoom({ firestore });

	return (
		<>
			<div className={styles.header}>
				<TeamsHeader
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					setActiveTeamCard={setActiveTeamCard}
				/>
				<CreateTeam />
			</div>

			<div className={styles.list_container}>
				<TeamsBody loading={loading} pinnedChats={pinnedChats} unpinnedChats={unpinnedChats} />
			</div>
		</>

	);
}

export default Teams;
