import { Popover, Avatar, Tabs, TabPanel } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMAppDelete, IcMArrowLeft, IcMHome } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { deleteDraftDoc } from '../../../../../helpers/teamsPinChatHelpers';

import EditName from './EditName';
import getTabMapping from './getTabMapping';
import Members from './Members';
import styles from './styles.module.css';
import ToUser from './ToUsers';
import VideoCalling from './VideoCalling';

function Header({
	activeTeamCard = {},
	viewType = '',
	firestore = {},
	setActiveTab = () => {},
	membersList = [],
	activeTab = {},
	hasPermissionToEdit = false,
	loggedInUserId = '',
	setLoadingDraft = () => {},
	loadingDraft = false,
	isMobile = false,
}) {
	const [activeTabChange, setActiveTabChange] = useState({});
	const {
		is_draft = false,
		is_group: isGroup = false,
		search_name = '',
		id = '',
		group_id = '',
		group_members_ids = [],
	} = activeTeamCard || {};

	const newDraft = isEmpty(group_members_ids);

	const closeRoom = () => {
		setActiveTab((prev) => ({ ...prev, data: {}, groupData: {} }));
	};

	const deleteDraft = () => {
		deleteDraftDoc({
			firestore,
			roomId          : id,
			loggedInAgentId : loggedInUserId,
			clearActiveRoom : closeRoom,
		});
	};

	if (is_draft && newDraft) {
		return (
			<ToUser
				firestore={firestore}
				setActiveTab={setActiveTab}
				viewType={viewType}
				setLoadingDraft={setLoadingDraft}
				loadingDraft={loadingDraft}
				isMobile={isMobile}
			/>
		);
	}

	const tabMapping = getTabMapping({ isGroup });

	return (
		<div className={styles.container}>
			<div className={styles.common_flex}>
				{isMobile ? (
					<IcMArrowLeft
						className={styles.arrow_back}
						onClick={() => setActiveTab(
							(prev) => ({
								...prev,
								data: {},
							}),
						)}
					/>
				) : (
					<IcMHome
						className={styles.arrow_back}
						onClick={() => setActiveTab((prev) => ({ ...prev, data: {} }))}
					/>
				)}
				{isGroup ? (
					<Image
						src={GLOBAL_CONSTANTS.image_url.teams}
						alt="group"
						width={28}
						height={28}
					/>
				) : (
					<Avatar
						personName={search_name || 'Unkown User'}
						alt="name"
						size="28px"
						className={styles.styled_avatar}
					/>
				)}
				<div
					role="presentation"
					className={styles.name}
					onClick={() => {
						if (isMobile) {
							setActiveTab((prev) => ({
								...prev,
								showSidebar   : true,
								expandSideBar : true,
							}));
						}
					}}
				>
					<EditName
						searchName={search_name}
						isGroup={isGroup}
						firestore={firestore}
						activeTab={activeTab}
						isDraft={is_draft}
					/>
					<Tabs
						activeTab={activeTabChange}
						fullWidth
						themeType="secondary"
						onChange={setActiveTabChange}
					>
						{tabMapping.map((eachTab) => {
							if (!eachTab.show) {
								return null;
							}

							return (
								<TabPanel
									key={eachTab?.value}
									name={eachTab?.value}
									title={eachTab?.label}
									badge={eachTab?.badge || null}
								/>
							);
						})}
					</Tabs>
				</div>
			</div>

			<div className={styles.buttons_flex}>
				{isGroup ? (
					<>
						<Popover
							placement="bottom-end"
							render={(
								<Members
									viewType={viewType}
									membersList={membersList}
									activeTeamCard={activeTeamCard}
									key={group_id || id}
									activeTab={activeTab}
									hasPermissionToEdit={hasPermissionToEdit}
									loggedInUserId={loggedInUserId}
									firestore={firestore}
									isDraft={is_draft}
								/>
							)}
							caret={false}
							className={styles.popover_styles}
						>
							<Image
								src={GLOBAL_CONSTANTS.image_url.groups}
								alt="group"
								width={25}
								height={22}
								className={styles.image_styles}
							/>
						</Popover>
						<div className={styles.count}>
							{is_draft
								? group_members_ids?.length : membersList?.length || ''}
						</div>
					</>
				) : null}
				{(hasPermissionToEdit && !is_draft) ? (
					<VideoCalling
						activeTab={activeTab}
						searchName={search_name}
						isGroup={isGroup}
					/>
				) : null}
			</div>
			{is_draft ? <IcMAppDelete className={styles.delete_icon} onClick={deleteDraft} /> : null}
		</div>
	);
}

export default Header;
