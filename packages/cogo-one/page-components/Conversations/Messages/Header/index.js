import { Button, cl } from '@cogoport/components';
import { startCase, isEmpty } from '@cogoport/utils';

import AssigneeAvatar from '../../../../common/AssigneeAvatar';
import UserAvatar from '../../../../common/UserAvatar';
import hideDetails from '../../../../utils/hideDetails';

import { showContent, TagsPopOver } from './HeaderFuncs';
import styles from './styles.module.css';

function Header({
	setOpenModal = () => {},
	activeMessageCard = {},
	restData = {},
	updatetags = () => {},
	setheaderTags = () => {},
	headertags = '',
}) {
	const {
		chat_tags = [],
		spectator_data = [],
		previous_agent_data = [],
		agent_name = '',
	} = restData || {};
	const { name = 'Unknown User', mobile_number = '+919876543210' } = activeMessageCard;

	const [firstSpectator = null] = spectator_data || [];

	return (
		<div className={styles.container}>
			<div className={styles.flex_space_between}>
				<div className={styles.flex}>
					<TagsPopOver
						prevtags={chat_tags}
						headertags={headertags}
						setheaderTags={setheaderTags}
						updatetags={updatetags}
					/>
					{showContent(chat_tags, 'right')}
				</div>
				<div className={styles.flex}>
					{!isEmpty(previous_agent_data)
					&& (previous_agent_data || [])
						.map(({ name:prevAssignedName = '' }) => (
							<AssigneeAvatar
								name={prevAssignedName}
								type="disabled"
								key={prevAssignedName}
							/>
						))}
					{agent_name
					&& (
						<div className={cl`${styles.active_agent} ${firstSpectator ? styles.margin_right : ''}`}>
							<AssigneeAvatar name={agent_name} type="active" key={agent_name} />
							{firstSpectator && (
								<div className={styles.spectator_div}>
									<AssigneeAvatar
										name={firstSpectator?.name}
										type="spectator"
										key={firstSpectator?.name}
									/>
								</div>
							)}
						</div>
					)}
					<Button
						themeType="secondary"
						size="md"
						className={styles.styled_button}
						onClick={() => setOpenModal({ type: 'assign', data: {} })}
					>
						Assign

					</Button>
				</div>
			</div>
			<div className={styles.flex_space_between}>
				<div className={styles.flex}>
					<UserAvatar type="whatsapp" />
					<div>
						<div className={styles.name}>{startCase(name)}</div>
						<div className={styles.phone_number}>
							{hideDetails({ data: mobile_number, type: 'number' })}
						</div>
					</div>
				</div>
				<Button themeType="primary" size="md">Mark as</Button>
			</div>
		</div>
	);
}

export default Header;
