import { Button, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	IcMArrowRotateRight,
	IcMArrowRotateDown,
} from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useFetchTeamsRoom from '../../../../hooks/useFetchTeamsRoom';
import LoadingState from '../LoadingState';

import GroupCard from './GroupCard';
import GroupCreateModal from './GroupCreateModal';
import styles from './styles.module.css';
import TeamsHeader from './TeamsHeader';

function Teams(teamsProps) {
	const { firestore = {} } = teamsProps;

	const [searchValue, setSearchValue] = useState('');
	const [creteTeams, setCreteTeams] = useState(false);
	const [filterVisible, setFilterVisible] = useState(false);
	const [openPinnedChats, setOpenPinnedChats] = useState(true);

	const {
		unpinnedChats,
		// handleScroll, add  on scroll
		pinnedChats,
		loading,
	} = useFetchTeamsRoom({ firestore });

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
				<Button
					size="md"
					className={styles.create_group}
					themeType="tertiary"
					onClick={() => setCreteTeams(true)}
				>
					<Image
						src={GLOBAL_CONSTANTS.image_url.groups}
						alt="cogo_one_logo"
						width={28}
						height={22}
					/>
					<div className={styles.text}>
						Create or Join A Team
					</div>
					<Pill size="sm" color="#FFD761">New</Pill>
				</Button>
			</div>

			<div className={styles.list_container}>
				{/* {!loading && isEmpty(pinnedChats) ? (
					<div className={styles.empty_state}>
						No Groups Yet...
					</div>
				) : null } */}

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
			<GroupCreateModal setCreteTeams={setCreteTeams} creteTeams={creteTeams} />
		</>

	);
}

export default Teams;
