import { Avatar, cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function UserCard({ item = {} }) {
	return (
		<div className={styles.user_list_container}>
			<div>
				<Avatar
					personName={item.name}
					alt="img"
					disabled={false}
					size="35px"
					className={styles.styled_avatar}
				/>
			</div>
			<div>
				<div className={cl`${styles.agent_label} ${styles.over_text}`}>
					{startCase(item.name)}
				</div>
				<div className={cl`${styles.lower_label} ${styles.over_text}`}>
					{item?.agent_data?.email}
				</div>
			</div>

		</div>
	);
}

export default UserCard;
