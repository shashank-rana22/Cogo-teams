import {
	IcMArrowRotateRight,
	IcMArrowRotateDown,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useFetchTeamsRoom from '../../../../hooks/useFetchTeamsRoom';
import LoadingState from '../LoadingState';

import CreateTeam from './CreateTeam';
import GroupCard from './GroupCard';
import styles from './styles.module.css';
import TeamsHeader from './TeamsHeader';

function Teams(teamsProps) {
	const { firestore = {} } = teamsProps;

	const [searchValue, setSearchValue] = useState('');
	const [filterVisible, setFilterVisible] = useState(false);
	const [openPinnedChats, setOpenPinnedChats] = useState(true);

	const {
		unpinnedChats = [],
		// handleScroll, add  on scroll
		// pinnedChats = [],
		loading,
	} = useFetchTeamsRoom({ firestore });

	const pinnedChats = [
		{
			id: '1',

		},
	];
	const isPinnedChatEmpty = isEmpty(pinnedChats);

	const ActiveIcon = openPinnedChats ? IcMArrowRotateDown : IcMArrowRotateRight;

	return (
		<>
			<div className={styles.header}>
				<TeamsHeader
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					filterVisible={filterVisible}
					setFilterVisible={setFilterVisible}
				/>
				<CreateTeam />
			</div>

			<div className={styles.list_container}>
				{!loading && isEmpty(pinnedChats) ? (
					<div className={styles.empty_state}>
						No Groups Yet...
					</div>
				) : null }

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
								{(pinnedChats || []).map((singleGroup) => (
									<GroupCard
										singleGroup={singleGroup}
										key={singleGroup}
										teamsProps={teamsProps}
									/>
								))}
							</div>
						)}
					</>
				)}

				{!loading && !isEmpty(unpinnedChats) ? (
					<>
						<div className={styles.recent_text}>Recent</div>
						{(unpinnedChats || []).map((singleGroup) => (
							<GroupCard
								singleGroup={singleGroup}
								key={singleGroup}
								teamsProps={teamsProps}
							/>
						))}
					</>
				) : null }

				{loading ? <LoadingState /> : null}
			</div>
		</>

	);
}

export default Teams;
