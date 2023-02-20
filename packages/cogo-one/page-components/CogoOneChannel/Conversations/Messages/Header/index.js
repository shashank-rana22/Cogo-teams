import { Button, cl } from '@cogoport/components';
import { startCase, isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import AssigneeAvatar from '../../../../../common/AssigneeAvatar';
import UserAvatar from '../../../../../common/UserAvatar';
import hideDetails from '../../../../../utils/hideDetails';

import { ShowContent, TagsPopOver } from './HeaderFuncs';
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

}) {
	const [isVisible, setIsVisible] = useState(false);
	const {
		chat_tags = [],
	} = activeMessageCard || {};
	const { user_name = '', business_name = '', mobile_no = '', channel_type } = formattedData || {};

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
					<ShowContent list={chat_tags} showMorePlacement="right" />
				</div>
				<div className={cl`${styles.flex} ${!hasPermissionToEdit ? styles.disabled_button : ''}`}>
					{!isEmpty(filteredSpectators)
					&& (filteredSpectators || [])
						.map(({ agent_name:prevAssignedName = '' }) => (
							<AssigneeAvatar
								name={prevAssignedName}
								type="disabled"
								key={prevAssignedName}
							/>
						))}
					{activeAgentName
					&& (
						<div className={styles.active_agent}>
							<AssigneeAvatar name={activeAgentName} type="active" key={activeAgentName} />
						</div>
					)}
					<Button
						themeType="secondary"
						size="md"
						disabled={!hasPermissionToEdit}
						className={styles.styled_button}
						onClick={() => setOpenModal({
							type : 'assign',
							data : {
								closeModal,
								assignLoading,
								assignChat,
							},
						})}
					>
						Assign

					</Button>
				</div>
			</div>
			<div className={styles.flex_space_between}>
				<div className={styles.flex}>
					<UserAvatar type={channel_type} />
					<div>
						<div className={styles.name}>{startCase(user_name)}</div>
						<div className={styles.phone_number}>
							{mobile_no ? hideDetails({ data: mobile_no, type: 'number' }) : business_name}
						</div>
					</div>
				</div>
				<Button
					themeType="primary"
					size="md"
					disabled={!hasPermissionToEdit}
					onClick={() => setOpenModal({
						type : 'mark_as_closed',
						data : {
							updateChat,
							loading,
						},
					})}
				>
					Mark as
				</Button>
			</div>
		</div>
	);
}

export default Header;
