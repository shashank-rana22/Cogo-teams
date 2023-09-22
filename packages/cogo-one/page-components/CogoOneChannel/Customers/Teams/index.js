import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	IcMArrowRotateRight,
	IcMArrowRotateDown,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import LoadingState from '../LoadingState';

import CreateTeam from './CreateTeam';
import GroupCard from './GroupCard';
import styles from './styles.module.css';
import TeamsHeader from './TeamsHeader';

function Teams(teamsProps) {
	const [searchValue, setSearchValue] = useState('');
	const [filterVisible, setFilterVisible] = useState(false);
	const [openPinnedChats, setOpenPinnedChats] = useState(true);
	// eslint-disable-next-line custom-eslint/variables-name-check
	const loading = false;
	const ActiveIcon = openPinnedChats ? IcMArrowRotateDown : IcMArrowRotateRight;
	const list = [
		{
			id           : 1,
			icon         : GLOBAL_CONSTANTS.image_url.private,
			name         : 'My First Team',
			disdcription : 'this my fotsy group vchcnjeneenjucn jbcjcnenk',

		},
		{
			id           : 2,
			icon         : GLOBAL_CONSTANTS.image_url.private,
			name         : 'First Group',
			disdcription : 'this my fotsy group vchcnjeneenjucn jbcjcnenk',

		},
		{
			id           : 3,
			icon         : GLOBAL_CONSTANTS.image_url.private,
			name         : 'First Group',
			disdcription : 'this my fotsy group vchcnjeneenjucn jbcjcnenk',

		},
		{
			icon         : GLOBAL_CONSTANTS.image_url.private,
			name         : 'First Group',
			disdcription : 'this my fotsy group vchcnjeneenjucn jbcjcnenk',

		},
		{
			icon         : GLOBAL_CONSTANTS.image_url.private,
			name         : 'My First Team',
			disdcription : 'this my fotsy group vchcnjeneenjucn jbcjcnenk',

		},
		{
			icon         : GLOBAL_CONSTANTS.image_url.private,
			name         : 'First Group',
			disdcription : 'this my fotsy group vchcnjeneenjucn jbcjcnenk',

		},

		{
			icon         : GLOBAL_CONSTANTS.image_url.private,
			name         : 'First Group',
			disdcription : 'this my fotsy group vchcnjeneenjucn jbcjcnenk',

		},
		{
			icon         : GLOBAL_CONSTANTS.image_url.private,
			name         : 'First Group',
			disdcription : 'this my fotsy group vchcnjeneenjucn jbcjcnenk',

		},
		{
			icon         : GLOBAL_CONSTANTS.image_url.private,
			name         : 'First Group',
			disdcription : 'this my fotsy group vchcnjeneenjucn jbcjcnenk',

		},

	];

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
				{!loading && isEmpty(list) ? (
					<div className={styles.empty_state}>
						No Groups Yet...
					</div>
				) : null }

				{/* {!isPinnedChatEmpty && ( */}
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
						{(list || []).map((singleGroup) => (
							<GroupCard
								singleGroup={singleGroup}
								key={singleGroup}
								teamsProps={teamsProps}
							/>
						))}
					</div>
				)}
				{/* )} */}

				{!loading && !isEmpty(list) ? (
					<>
						<div className={styles.recent_text}>Recent</div>
						{(list || []).map((singleGroup) => (
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
