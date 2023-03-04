import { Button, cl } from '@cogoport/components';
import { startCase, isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import AssigneeAvatar from '../../../../../common/AssigneeAvatar';
import UserAvatar from '../../../../../common/UserAvatar';
import { PLATFORM_MAPPING } from '../../../../../constants';
import hideDetails from '../../../../../utils/hideDetails';

import Assignes from './Assignes';
import TagsPopOver from './HeaderFuncs';
import ShowContent from './ShowContent';
import styles from './styles.module.css';

function Header({
	setOpenModal = () => {},
	formattedData = {},
	setheaderTags = () => {},
	headertags = '',
	updateChat = () => {},
	loading = false,
	closeModal = () => {},
	assignLoading = false,
	assignChat = () => {},
	activeAgentName = '',
	hasPermissionToEdit = false,
	filteredSpectators = [],
	activeMessageCard,
	tagOptions = [],
	support_agent_id = null,
	showBotMessages = false,
	userId = '',
	isomniChannelAdmin = false,
}) {
	const [isVisible, setIsVisible] = useState(false);
	const {
		chat_tags = [],
	} = activeMessageCard || {};

	const { user_name = '', business_name = '', mobile_no = '', channel_type, user_type } = formattedData || {};

	const getLowerLabel = () => {
		if (user_name?.includes('anonymous')) {
			return PLATFORM_MAPPING[user_type] || '';
		}
		return mobile_no
			? `+${hideDetails({ data: mobile_no, type: 'number' })}`
			: business_name;
	};
	const disableAssignButton = !isomniChannelAdmin;
	const assignButtonAction = () => {
		if (showBotMessages && isomniChannelAdmin) {
			const payload = {
				agent_id        : userId,
				allowed_to_chat : true,
			};
			assignChat(payload);
		} else {
			setOpenModal({
				type : 'assign',
				data : {
					closeModal,
					assignLoading,
					assignChat,
					support_agent_id,
				},
			});
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.flex_space_between}>
				<div className={styles.flex}>
					<TagsPopOver
						prevtags={chat_tags}
						headertags={headertags}
						setheaderTags={setheaderTags}
						isVisible={isVisible}
						setIsVisible={setIsVisible}
						updateChat={updateChat}
						loading={loading}
						tagOptions={tagOptions}
						hasPermissionToEdit={hasPermissionToEdit}
					/>
					<ShowContent list={chat_tags} showMorePlacement="right" hasPermissionToEdit={hasPermissionToEdit} />
				</div>
				<div className={cl`${styles.flex} ${disableAssignButton ? styles.disabled_button : ''}`}>
					{!isEmpty(filteredSpectators)
					&& <Assignes filteredSpectators={filteredSpectators} />}
					{activeAgentName
					&& (
						<div className={styles.active_agent}>
							<AssigneeAvatar name={activeAgentName} type="active" key={activeAgentName} />
						</div>
					)}
					<Button
						themeType="secondary"
						size="md"
						disabled={disableAssignButton}
						className={styles.styled_button}
						onClick={assignButtonAction}
						loading={showBotMessages && assignLoading}
					>
						{(showBotMessages && isomniChannelAdmin) ? 'Stop and Assign' : 'Assign'}

					</Button>
				</div>
			</div>
			<div className={styles.flex_space_between}>
				<div className={styles.flex}>
					<UserAvatar type={channel_type} />
					<div>
						<div className={styles.name}>{startCase(user_name) || 'User'}</div>
						<div className={styles.phone_number}>
							{getLowerLabel()}
						</div>
					</div>
				</div>
				<Button
					themeType="primary"
					size="sm"
					disabled={!hasPermissionToEdit}
					onClick={() => setOpenModal({
						type : 'mark_as_closed',
						data : {
							updateChat,
							loading,
						},
					})}
				>
					Mark as Closed
				</Button>
			</div>
		</div>
	);
}

export default Header;
