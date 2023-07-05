import { Input, Popover, cl, Tabs, TabPanel } from '@cogoport/components';
import {
	IcMFilter,
	IcMSearchlight,
	IcMArrowRotateRight,
	IcMArrowRotateDown,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import TABS_MAPPING from '../../../../constants/messgesTabsMapping';
import useBulkAssignChat from '../../../../hooks/useBulkAssignChat';
import FilterComponents from '../FilterComponents';
import LoadingState from '../LoadingState';
import NewWhatsappMessage from '../NewWhatsappMessage';

import AutoAssignComponent from './AutoAssignComponent';
import FlashUserChats from './FlashUserChats';
import MessageCardData from './MessageCardData';
import styles from './styles.module.css';

const GROUP_TABS_VIEW_ACCESS = ['admin_view', 'supply_view'];
const FLASH_MESSAGES_VIEW_ACCESS = ['admin_view', 'kam_view'];

function MessageList(messageProps) {
	const {
		messagesList,
		setSearchValue = () => { },
		filterVisible,
		searchValue,
		setFilterVisible = () => { },
		setAppliedFilters = () => { },
		appliedFilters,
		messagesLoading = false,
		activeCardId = '',
		setActiveMessage,
		showBotMessages = false,
		setShowBotMessages = () => {},
		isomniChannelAdmin = false,
		setModalType = () => {},
		modalType = '',
		handleScroll = () => {},
		tagOptions = [],
		userId,
		sortedPinnedChatList = [],
		firestore,
		viewType = '',
		flashMessagesList = [],
		flashMessagesLoading = false,
		activeTab = 'all',
		setActiveTab,
	} = messageProps;

	const [openPinnedChats, setOpenPinnedChats] = useState(true);
	const [autoAssignChats, setAutoAssignChats] = useState(true);
	const [selectedAutoAssign, setSelectedAutoAssign] = useState({});
	const [showCarousel, setShowCarousel] = useState(false);
	const handleCheckedChats = (item, id) => {
		if (id in selectedAutoAssign) {
			setSelectedAutoAssign((p) => {
				const arg = p;
				delete (arg[id]);
				return { ...p };
			});
		} else {
			setSelectedAutoAssign((p) => ({ ...p, [id]: item }));
		}
	};
	const isPinnedChatEmpty = isEmpty(sortedPinnedChatList) || false;
	const isFlashMessagesEmpty = isEmpty(flashMessagesList) || false;

	const canShowCarousel = FLASH_MESSAGES_VIEW_ACCESS.includes(viewType) && showCarousel
	&& showCarousel !== 'in_timeout' && !isFlashMessagesEmpty && !flashMessagesLoading;

	const getListHeightStyles = () => {
		if (showBotMessages && isomniChannelAdmin && !canShowCarousel) {
			return 'bot_list_container_empty_flash';
		}
		if (showBotMessages && isomniChannelAdmin) {
			return 'bot_list_container';
		}
		if (!canShowCarousel) {
			return 'list_container_empty_flash';
		}
		return 'list_container_height';
	};

	useEffect(() => {
		if (!isFlashMessagesEmpty) {
			setShowCarousel((p) => (p !== 'in_timeout' || p));
		}
	}, [isFlashMessagesEmpty]);

	const {
		bulkAssignChat = () => {},
		bulkAssignLoading = false,
	} = useBulkAssignChat({ setSelectedAutoAssign, setAutoAssignChats });

	const handleAutoAssignBack = () => {
		setAutoAssignChats(true);
		setSelectedAutoAssign({});
	};

	useEffect(() => {
		handleAutoAssignBack();
	}, [showBotMessages, appliedFilters]);

	const ActiveIcon = openPinnedChats ? IcMArrowRotateDown : IcMArrowRotateRight;

	return (
		<>
			{GROUP_TABS_VIEW_ACCESS.includes(viewType)
			&& (
				<div className={styles.tabs}>
					<Tabs
						activeTab={activeTab}
						fullWidth
						themeType="secondary"
						onChange={setActiveTab}
					>
						{TABS_MAPPING.map((eachTab) => (
							<TabPanel
								key={eachTab.name}
								name={eachTab.name}
								title={eachTab.title}
							/>
						))}
					</Tabs>
				</div>
			)}

			<FlashUserChats
				flashMessagesList={flashMessagesList}
				activeCardId={activeCardId}
				userId={userId}
				setActiveMessage={setActiveMessage}
				firestore={firestore}
				showCarousel={showCarousel}
				setShowCarousel={setShowCarousel}
				canShowCarousel={canShowCarousel}
			/>
			<div className={styles.filters_container}>
				<div className={styles.source_types}>
					<Input
						size="sm"
						prefix={<IcMSearchlight width={18} height={18} />}
						placeholder="Search here..."
						value={searchValue}
						onChange={(val) => setSearchValue(val)}
					/>
				</div>
				<div className={styles.filter_icon}>
					<Popover
						placement="right"
						render={(
							filterVisible && (
								<FilterComponents
									setFilterVisible={setFilterVisible}
									filterVisible={filterVisible}
									appliedFilters={appliedFilters}
									setAppliedFilters={setAppliedFilters}
									setShowBotMessages={setShowBotMessages}
									showBotMessages={showBotMessages}
									isomniChannelAdmin={isomniChannelAdmin}
									tagOptions={tagOptions}
									viewType={viewType}
								/>
							)
						)}
						className={styles.styled_popover}
						visible={filterVisible}
						onClickOutside={() => setFilterVisible(false)}
					>
						<IcMFilter
							onClick={() => setFilterVisible((prev) => !prev)}
							className={styles.filter_icon}
						/>
					</Popover>
					{(!isEmpty(appliedFilters)
					|| (showBotMessages && !isomniChannelAdmin))
					&& <div className={styles.filters_applied} />}
				</div>
			</div>

			{ isEmpty(messagesList) && isPinnedChatEmpty && !messagesLoading ? (
				<div className={styles.list_container}>
					<div className={styles.empty_state}>
						No Messages Yet..
					</div>
				</div>
			) : (
				<>
					{showBotMessages && isomniChannelAdmin && (
						<AutoAssignComponent
							autoAssignChats={autoAssignChats}
							setAutoAssignChats={setAutoAssignChats}
							handleAutoAssignBack={handleAutoAssignBack}
							selectedAutoAssign={selectedAutoAssign}
							bulkAssignLoading={bulkAssignLoading}
							bulkAssignChat={bulkAssignChat}
						/>
					)}
					<div
						className={cl`${styles.list_container} 
						${styles[getListHeightStyles()]}`}
						onScroll={handleScroll}
					>
						{!isPinnedChatEmpty && (
							<>
								<div
									role="button"
									tabIndex={0}
									className={styles.pinned_chat_flex}
									onClick={() => setOpenPinnedChats((p) => !p)}
								>
									<ActiveIcon className={styles.icon} />
									<div className={styles.pin_text}>pinned chats</div>
								</div>
								{openPinnedChats && (
									<div className={styles.pinned_chats_div}>
										{(sortedPinnedChatList || []).map((item) => (
											<MessageCardData
												key={item?.id}
												item={item}
												activeCardId={activeCardId}
												userId={userId}
												setActiveMessage={setActiveMessage}
												firestore={firestore}
												autoAssignChats={autoAssignChats}
												handleCheckedChats={handleCheckedChats}
												showBotMessages={showBotMessages}
											/>
										))}
									</div>
								)}
							</>
						)}
						<div className={styles.recent_text}>Recent</div>
						{(messagesList || []).map((item) => (
							<MessageCardData
								key={item?.id}
								item={item}
								activeCardId={activeCardId}
								userId={userId}
								setActiveMessage={setActiveMessage}
								firestore={firestore}
								autoAssignChats={autoAssignChats}
								handleCheckedChats={handleCheckedChats}

							/>
						))}
						{messagesLoading && <LoadingState />}
					</div>
				</>
			)}

			{modalType?.type && (
				<NewWhatsappMessage
					setModalType={setModalType}
					modalType={modalType}
				/>
			)}
		</>
	);
}

export default MessageList;
