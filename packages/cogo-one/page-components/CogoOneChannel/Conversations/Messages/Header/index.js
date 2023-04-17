import { Button, cl, Popover } from '@cogoport/components';
import { IcMProfile, IcMRefresh } from '@cogoport/icons-react';
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
	setDisableButton = () => {},
	disableButton = '',
	updateRoomLoading = false,
	updateUserRoom = () => {},
}) {
	const [isVisible, setIsVisible] = useState(false);
	const [openPopover, setOpenPopover] = useState(false);
	const { chat_tags = [] } = activeMessageCard || {};

	const {
		user_name = '',
		business_name = '',
		mobile_no = '',
		channel_type,
		user_type,
		search_user_name = '',
	} = formattedData || {};

	const getLowerLabel = () => {
		if (user_name?.includes('anonymous')) {
			return PLATFORM_MAPPING[user_type] || '';
		}
		return mobile_no
			? `+${hideDetails({ data: mobile_no, type: 'number' })}`
			: business_name;
	};
	const disableAssignButton = showBotMessages && !isomniChannelAdmin;

	const openAssignModal = () => {
		setOpenModal({
			type : 'assign',
			data : {
				closeModal,
				assignLoading,
				assignChat,
				support_agent_id,
			},
		});
	};

	const assignButtonAction = (type) => {
		setDisableButton(type);
		if (type === 'assign') {
			setOpenPopover(false);
			openAssignModal();
			return;
		}
		const payload = {
			agent_id           : type === 'stop_and_assign' ? userId : undefined,
			is_allowed_to_chat : true,
		};
		assignChat(payload);
	};

	const renderButtonOption = () => (
		<div className={styles.button_container}>
			<Button
				themeType="secondary"
				size="md"
				disabled={disableButton}
				className={styles.styled_buttons}
				onClick={() => assignButtonAction('stop_and_assign')}
				loading={assignLoading && disableButton === 'stop_and_assign'}
			>
				Assign to me
			</Button>
			<Button
				themeType="secondary"
				size="md"
				disabled={disableButton}
				className={styles.styled_buttons}
				onClick={() => assignButtonAction('auto_assign')}
				loading={assignLoading && disableButton === 'auto_assign'}
			>
				Auto Assign
			</Button>
			<Button
				themeType="secondary"
				size="md"
				disabled={disableButton}
				className={styles.styled_button}
				onClick={() => assignButtonAction('assign')}
				loading={assignLoading && disableButton === 'assign'}
			>
				Assign
			</Button>
		</div>
	);

	const renderRightButton = () => (
		<div>
			{showBotMessages && isomniChannelAdmin ? (
				<Popover
					placement="bottom"
					trigger="click"
					render={renderButtonOption()}
					visible={openPopover}
					onClickOutside={() => setOpenPopover(false)}
				>
					<Button
						themeType="secondary"
						size="md"
						className={styles.styled_button}
						onClick={() => setOpenPopover(true)}

					>
						Assign To
					</Button>
				</Popover>
			) : (
				<Button
					themeType="secondary"
					size="md"
					disabled={disableAssignButton}
					className={styles.styled_button}
					onClick={openAssignModal}
					loading={showBotMessages && assignLoading}
				>
					Assign
				</Button>
			)}
		</div>
	);

	const handleUpdateUser = () => {
		if (!updateRoomLoading) {
			updateUserRoom(mobile_no);
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
					<ShowContent
						list={chat_tags}
						showMorePlacement="right"
						hasPermissionToEdit={hasPermissionToEdit}
					/>
				</div>
				<div
					className={cl`${styles.flex} ${
						disableAssignButton ? styles.disabled_button : ''
					}`}
				>
					{!isEmpty(filteredSpectators) && (
						<Assignes filteredSpectators={filteredSpectators} />
					)}
					{activeAgentName && (
						<div className={styles.active_agent}>
							<AssigneeAvatar
								name={activeAgentName}
								type="active"
								key={activeAgentName}
							/>
						</div>
					)}
					{renderRightButton()}
					{isomniChannelAdmin && channel_type === 'whatsapp' && (
						<div
							role="button"
							tabIndex="0"
							className={cl`${styles.icon_div} ${updateRoomLoading ? styles.disable_icon : ''}`}
							onClick={handleUpdateUser}
						>
							<IcMProfile
								className={cl`${styles.profile_icon} 
								${updateRoomLoading ? styles.disable_icon : ''}`}
							/>
							<IcMRefresh className={cl`${styles.update_icon} 
								${updateRoomLoading ? styles.disable_icon : ''}`}
							/>
						</div>
					)}
				</div>
			</div>
			<div className={styles.flex_space_between}>
				<div className={styles.flex}>
					<UserAvatar type={channel_type} />
					<div>
						<div className={styles.name}>
							{startCase(user_name) || 'User'}
							{channel_type === 'whatsapp' && (
								<span className={styles.span_whatsapp_name}>
									(
									{startCase(search_user_name) || 'User'}
									)
								</span>
							)}
						</div>
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
