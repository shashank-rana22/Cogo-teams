import { isEmpty } from '@cogoport/utils';

import DotLoader from '../../../../../../../common/LoadingState/DotLoader';

import styles from './styles.module.css';
import UserCard from './UsersCard';

function UsersList({
	loading = false,
	list = [],
	selectedId = '',
	setSelectedUser = () => {},
}) {
	if (loading) {
		return (
			<div className={styles.loader_container}>
				<DotLoader />
			</div>
		);
	}

	if (isEmpty(list) && !loading) {
		return (
			<div className={styles.empty_text}>
				No Users Found
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{list.map((user) => (
				<UserCard
					key={user.id}
					isSelected={selectedId === user.id}
					onClick={setSelectedUser}
					user={user}
				/>
			))}
		</div>
	);
}

export default UsersList;
