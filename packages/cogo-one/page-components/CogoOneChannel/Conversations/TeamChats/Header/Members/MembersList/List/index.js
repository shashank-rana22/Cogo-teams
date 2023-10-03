import { Avatar } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import {
	startCase,
} from '@cogoport/utils';

import styles from './styles.module.css';

function EachMember({
	eachPerson = {},
	isDraft = false,
	hasPermissionToEdit = false,
	loading = false,
	updateGroup = () => {},
	loggedInAgentId = '',
}) {
	const {
		partner = {},
		name :draftName = '',
		user_id = '',
		id :draftUserId = '',
	} = eachPerson || {};
	const { name = '' } = partner || {};

	const formattedName = startCase(isDraft ? draftName : name);

	const modifiedUserId = isDraft ? draftUserId : user_id;

	return (
		<div className={styles.each_member}>
			<div className={styles.flex_name}>
				<Avatar
					personName={formattedName}
					size="24px"
					className={styles.styled_avatar}
				/>
				<div className={styles.name}>
					{startCase(formattedName)}
				</div>
			</div>
			{ (hasPermissionToEdit && loggedInAgentId !== modifiedUserId) ? (
				<IcMCross
					className={styles.cross_styles}
					style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
					onClick={() => {
						updateGroup({ userId: modifiedUserId });
					}}
				/>
			) : null}
		</div>
	);
}

function List({
	membersList = [],
	isDraft = false,
	hasPermissionToEdit = false,
	loading = false,
	updateGroup = () => {},
	loggedInAgentId = '',
}) {
	return (
		<div className={styles.list}>
			{membersList?.map((eachPerson) => (
				<EachMember
					key={eachPerson?.user_id}
					eachPerson={eachPerson}
					isDraft={isDraft}
					hasPermissionToEdit={hasPermissionToEdit}
					loading={loading}
					updateGroup={updateGroup}
					loggedInAgentId={loggedInAgentId}
				/>
			))}
		</div>
	);
}
export default List;
