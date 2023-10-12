import { Avatar } from '@cogoport/components';
import { IcMCross, IcMProfile } from '@cogoport/icons-react';
import {
	startCase,
} from '@cogoport/utils';

import styles from './styles.module.css';

function EachMember({
	eachPerson = {},
	isDraft = false,
	loading = false,
	updateGroup = () => {},
	loggedInAgentId = '',
	isAgentAdmin = false,
}) {
	const {
		partner = {},
		name :draftName = '',
		user_id = '',
		id :draftUserId = '',
		access_type = '',
	} = eachPerson || {};

	const { name = '' } = partner || {};

	const formattedName = startCase(isDraft ? draftName : name);

	const modifiedUserId = isDraft ? draftUserId : user_id;

	const isAdmin = access_type === 'owner';

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
				{!isDraft ? (
					<IcMProfile
						className={styles.admin}
						style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
						fill={isAdmin ? '#F68B21' : '#BDBDBD'}
						onClick={() => {
							if (!isAgentAdmin || loggedInAgentId === modifiedUserId || loading) {
								return;
							}

							updateGroup({
								userId     : modifiedUserId,
								actionName : isAdmin ? 'REMOVE_OWNER_FROM_GROUP' : 'ADD_OWNER_TO_GROUP',
							});
						}}
					/>
				) : null}
			</div>
			{(isAgentAdmin && loggedInAgentId !== modifiedUserId) ? (
				<IcMCross
					className={styles.cross_styles}
					style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
					onClick={() => {
						if (loading) {
							return;
						}

						updateGroup({ userId: modifiedUserId, actionName: 'REMOVE_FROM_GROUP' });
					}}
				/>
			) : null}
		</div>
	);
}

function List({
	membersList = [],
	isDraft = false,
	loading = false,
	updateGroup = () => {},
	loggedInAgentId = '',
	isAgentAdmin = false,
}) {
	return (
		<div className={styles.list}>
			{membersList?.map((eachPerson) => (
				<EachMember
					key={eachPerson?.user_id}
					eachPerson={eachPerson}
					isDraft={isDraft}
					loading={loading}
					updateGroup={updateGroup}
					loggedInAgentId={loggedInAgentId}
					isAgentAdmin={isAgentAdmin}
				/>
			))}
		</div>
	);
}
export default List;
