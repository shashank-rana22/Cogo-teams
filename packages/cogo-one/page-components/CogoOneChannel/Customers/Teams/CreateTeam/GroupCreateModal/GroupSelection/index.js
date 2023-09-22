import { cl } from '@cogoport/components';
import { Image } from '@cogoport/next';
import React from 'react';

import { GROUP_TYPE_SELECTIONS } from '../../../../../../../constants/GROUP_TYPE_SELECTIONS';

import styles from './styles.module.css';

function GroupSelection({
	setSelectedGroup = () => {},
	selectedGroup = {},
}) {
	const { group_type = '' } = selectedGroup || {};

	return (
		<div className={styles.container}>
			{(GROUP_TYPE_SELECTIONS || []).map((item) => {
				const { name = '', icon = '', label = '', value = '' } = item || {};
				return (
					<div
						className={cl`${styles.card} ${group_type === value ? styles.active_card : ''}`}
						key={value}
						onClick={() => setSelectedGroup({ ...selectedGroup, group_type: value })}
						role="presentation"
					>
						<Image
							src={icon}
							alt="group"
							width={32}
							height={32}
							className={styles.image}
						/>
						<div className={styles.content}>
							<div className={styles.title}>
								{name}
							</div>
							<div className={styles.label}>
								{label}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default GroupSelection;
