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
	updateCogooneGroup = () => {},
}) {
	const {
		partner = {},
		name :draftName = '',
		user_id = '',
	} = eachPerson || {};
	const { name = '' } = partner || {};

	const formattedName = startCase(isDraft ? draftName : name);

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
			{(!isDraft && hasPermissionToEdit) ? (
				<IcMCross
					className={styles.cross_styles}
					onClick={() => {
						updateCogooneGroup({ actionName: 'REMOVE_FROM_GROUP', userIds: [user_id] });
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
	updateCogooneGroup = () => {},
}) {
	return (
		<div className={styles.list}>
			{membersList?.map((eachPerson) => (
				<EachMember
					key={eachPerson?.user_id}
					eachPerson={eachPerson}
					isDraft={isDraft}
					hasPermissionToEdit={hasPermissionToEdit}
					updateCogooneGroup={updateCogooneGroup}
				/>
			))}
		</div>
	);
}
export default List;
