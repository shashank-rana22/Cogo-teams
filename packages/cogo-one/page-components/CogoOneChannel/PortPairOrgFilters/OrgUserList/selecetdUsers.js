import { cl } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import UserAvatar from '../../../../common/UserAvatar';

import styles from './styles.module.css';

const MIN_LENGTH = 1;

function SelecetdUsers({
	selectedAutoAssign = {},
	setSelectedAutoAssign = () => {},
}) {
	const handleDelete = ({ eachUser }) => {
		const { id } = eachUser || {};
		if (id in selectedAutoAssign && Object.keys(selectedAutoAssign || {}).length > MIN_LENGTH) {
			setSelectedAutoAssign((prev) => {
				const arg = prev;
				delete (arg[id]);
				return { ...prev };
			});
		}
	};

	return (
		<div className={styles.list_container}>
			{Object.keys(selectedAutoAssign || {})?.map((eachUserKey) => {
				const eachUser = selectedAutoAssign[eachUserKey];
				const { user_id, user_name } = eachUser || {};

				return (
					<div
						key={user_id}
						className={cl`${styles.each_container} ${styles.card_container}`}
					>
						<div className={styles.parent_flex}>
							<UserAvatar type="whatsapp" />
							<div className={styles.name}>{startCase(user_name?.toLowerCase()) || 'Users'}</div>
						</div>
						<IcMCross
							onClick={() => handleDelete({ eachUser })}
							className={styles.cross_icon}
						/>
					</div>
				);
			})}
		</div>
	);
}

export default SelecetdUsers;
