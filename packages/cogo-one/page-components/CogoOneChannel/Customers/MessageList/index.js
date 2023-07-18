import {
	IcMArrowRotateRight,
	IcMArrowRotateDown,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../constants/viewTypeMapping';
import useBulkAssignChat from '../../../../hooks/useBulkAssignChat';
import useListChats from '../../../../hooks/useListChats';
import LoadingState from '../LoadingState';

import AutoAssignComponent from './AutoAssignComponent';
import FlashUserChats from './FlashUserChats';
import Header from './Header';
import MessageCardData from './MessageCardData';
import styles from './styles.module.css';

function MessageList(messageProps) {
	const {
		setActiveTab,
		activeTab,
		tagOptions = [],
		userId,
		firestore,
		viewType = '',
		isBotSession,
		setIsBotSession,
	} = messageProps;

	const [openPinnedChats, setOpenPinnedChats] = useState(true);
	const [autoAssignChats, setAutoAssignChats] = useState(true);
	const [selectedAutoAssign, setSelectedAutoAssign] = useState({});
	const [carouselState, setCarouselState] = useState('hide');
	const [searchValue, setSearchValue] = useState('');

	const { subTab } = activeTab || {};
	const {
		chatsData,
		appliedFilters,
		handleScroll,
		loadingState,
		setActiveMessage,
		setAppliedFilters,
	} = useListChats({
		firestore,
		userId,
		isBotSession,
		searchValue,
		viewType,
		setActiveTab,
		activeSubTab: subTab,
		setCarouselState,
	});

	const setActiveSubTab = (val) => {
		setActiveTab((prev) => ({ ...prev, subTab: val, data: {} }));
	};

	const {
		bulkAssignChat = () => {},
		bulkAssignLoading = false,
	} = useBulkAssignChat({
		setSelectedAutoAssign,
		setAutoAssignChats,
	});

	const {
		messagesList,
		sortedPinnedChatList,
		flashMessagesList,
	} = chatsData;

	const isPinnedChatEmpty = isEmpty(sortedPinnedChatList);

	const ActiveIcon = openPinnedChats ? IcMArrowRotateDown : IcMArrowRotateRight;

	const handleCheckedChats = (item, id) => {
		if (id in selectedAutoAssign) {
			setSelectedAutoAssign((prev) => {
				const arg = prev;
				delete (arg[id]);
				return { ...prev };
			});
		} else {
			setSelectedAutoAssign((prev) => ({ ...prev, [id]: item }));
		}
	};

	const handleAutoAssignBack = () => {
		setAutoAssignChats(true);
		setSelectedAutoAssign({});
	};

	useEffect(() => {
		handleAutoAssignBack();
	}, [isBotSession, appliedFilters]);

	return (
		<>
			<FlashUserChats
				flashMessagesList={flashMessagesList}
				activeTab={activeTab}
				userId={userId}
				setActiveMessage={setActiveMessage}
				firestore={firestore}
				carouselState={carouselState}
				setCarouselState={setCarouselState}
				viewType={viewType}
			/>

			<Header
				activeSubTab={subTab}
				setActiveSubTab={setActiveSubTab}
				setSearchValue={setSearchValue}
				searchValue={searchValue}
				viewType={viewType}
				tagOptions={tagOptions}
				setAppliedFilters={setAppliedFilters}
				setIsBotSession={setIsBotSession}
				appliedFilters={appliedFilters}
				isBotSession={isBotSession}
			/>

			{(isEmpty(messagesList)
				&& isPinnedChatEmpty
				&& !loadingState?.chatsLoading
			)
				? (
					<div className={styles.list_container}>
						<div className={styles.empty_state}>
							No Messages Yet..
						</div>
					</div>
				) : (
					<>
						{isBotSession
							&& VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions.bulk_auto_assign
							&& (
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
							onScroll={handleScroll}
							className={styles.list_container}
							style={{
								height: carouselState === 'show'
									? 'calc(100% - 330px)' : 'calc(100% - 220px)',
							}}
						>
							{!isPinnedChatEmpty && (
								<>
									<div
										role="presentation"
										className={styles.pinned_chat_flex}
										onClick={() => setOpenPinnedChats((prev) => !prev)}
									>
										<ActiveIcon className={styles.icon} />
										<div className={styles.pin_text}>pinned chats</div>
									</div>

									{openPinnedChats && (
										<div className={styles.pinned_chats_div}>
											{(sortedPinnedChatList || []).map(
												(item) => (
													<MessageCardData
														key={item?.id}
														item={item}
														userId={userId}
														firestore={firestore}
														autoAssignChats={autoAssignChats}
														handleCheckedChats={handleCheckedChats}
														isBotSession={isBotSession}
														setActiveMessage={setActiveMessage}
														activeTab={activeTab}
														viewType={viewType}
													/>
												),
											)}
										</div>
									)}
								</>
							)}

							<div className={styles.recent_text}>Recent</div>
							{(messagesList || []).map(
								(item) => (
									<MessageCardData
										key={item?.id}
										item={item}
										userId={userId}
										firestore={firestore}
										autoAssignChats={autoAssignChats}
										handleCheckedChats={handleCheckedChats}
										setActiveMessage={setActiveMessage}
										activeTab={activeTab}
										viewType={viewType}
									/>
								),
							)}

							{loadingState?.chatsLoading && <LoadingState />}
						</div>
					</>
				)}
		</>
	);
}

export default MessageList;
