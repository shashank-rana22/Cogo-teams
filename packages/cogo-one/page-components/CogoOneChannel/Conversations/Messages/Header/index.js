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
	roomData = {},
	updateChat = () => {},
	loading = false,
	closeModal = () => {},
	assignLoading = false,
	assignChat = () => {},

}) {
	const [isVisible, setIsVisible] = useState(false);
	const {
		chat_tags = [],
		spectator_data = [],
		previous_agent_data = [],
		agent_name = '',
	} = roomData || {};
	const { user_name = '', business_name = '', mobile_number = '' } = formattedData || {};

	const [firstSpectator = null] = spectator_data || [];

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
					/>
					<ShowContent list={chat_tags} showMorePlacement="right" />
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
					<UserAvatar type="whatsapp" />
					<div>
						<div className={styles.name}>{startCase(user_name)}</div>
						<div className={styles.phone_number}>
							{mobile_number ? hideDetails({ data: mobile_number, type: 'number' }) : business_name}
						</div>
					</div>
				</div>
				<Button
					themeType="primary"
					size="md"
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
