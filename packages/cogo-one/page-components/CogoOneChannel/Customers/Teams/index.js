import { Button, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import LoadingState from '../LoadingState';

import GroupCard from './GroupCard';
import GroupCreateModal from './GroupCreateModal';
import styles from './styles.module.css';
import TeamsHeader from './TeamsHeader';

function Teams(teamsProps) {
	const [searchValue, setSearchValue] = useState('');
	const [creteTeams, setCreteTeams] = useState(false);
	const [filterVisible, setFilterVisible] = useState(false);

	// eslint-disable-next-line custom-eslint/variables-name-check
	const loading = false;

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
				{!loading && isEmpty(list) ? (
					<div className={styles.empty_state}>
						No Groups Yet...
					</div>
				) : null }

				{!loading && !isEmpty(list) ? (
					<>
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
			<GroupCreateModal setCreteTeams={setCreteTeams} creteTeams={creteTeams} />
		</>

	);
}

export default Teams;
