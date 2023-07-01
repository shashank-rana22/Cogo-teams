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
	const [activeSubTab, setActiveSubTab] = useState('all');

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
		activeSubTab,
		setCarouselState,
	});

	const {
		bulkAssignChat = () => {},
		bulkAssignLoading = false,
	} = useBulkAssignChat({ setSelectedAutoAssign, setAutoAssignChats });

	const {
		messagesList,
		sortedPinnedChatList,
		flashMessagesList,
	} = chatsData;

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

	const isPinnedChatEmpty = isEmpty(sortedPinnedChatList);

	const handleAutoAssignBack = () => {
		setAutoAssignChats(true);
		setSelectedAutoAssign({});
	};

	const ActiveIcon = openPinnedChats ? IcMArrowRotateDown : IcMArrowRotateRight;

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
			/>
			<Header
				activeSubTab={activeSubTab}
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
			{ isEmpty(messagesList) && isPinnedChatEmpty && !loadingState?.chatsLoading ? (
				<div className={styles.list_container}>
					<div className={styles.empty_state}>
						No Messages Yet..
					</div>
				</div>
			) : (
				<>
					{isBotSession && VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions.bulk_auto_assign && (
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
						className={styles.list_container}
						onScroll={handleScroll}
						style={{
							height: carouselState === 'show'
								? 'calc(100% - 330px)' : 'calc(100% - 220px)',
						}}
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
												userId={userId}
												firestore={firestore}
												autoAssignChats={autoAssignChats}
												handleCheckedChats={handleCheckedChats}
												isBotSession={isBotSession}
												setActiveMessage={setActiveMessage}
												activeTab={activeTab}
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
								userId={userId}
								firestore={firestore}
								autoAssignChats={autoAssignChats}
								handleCheckedChats={handleCheckedChats}
								setActiveMessage={setActiveMessage}
								activeTab={activeTab}
							/>
						))}
						{loadingState?.chatsLoading && <LoadingState />}
					</div>
				</>
			)}
		</>
	);
}

export default MessageList;
