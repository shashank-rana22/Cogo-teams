import { Button, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React, { useState } from 'react';

import GroupCreateModal from './GroupCreateModal';
import styles from './styles.module.css';

function CreateTeam() {
	const [createTeams, setCreateTeams] = useState(false);

	return (
		<>

			<Button
				size="md"
				className={styles.create_group}
				themeType="tertiary"
				onClick={() => setCreateTeams(true)}
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

			<GroupCreateModal setCreateTeams={setCreateTeams} createTeams={createTeams} />
		</>
	);
}

export default CreateTeam;
