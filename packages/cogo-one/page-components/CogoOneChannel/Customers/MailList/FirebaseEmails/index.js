import {
	IcMArrowRotateRight,
	IcMArrowRotateDown,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import ViewAttachmentsModal from '../../../../../common/ViewAttachmentsModal';
import useListChats from '../../../../../hooks/useListChats';
import getDownloadFiles from '../../../../../utils/getDownloadFiles';
import LoadingState from '../../LoadingState';

import Header from './Header';
import MessageCardData from './MessageCardData';
import styles from './styles.module.css';

function FirebaseEmails(messageProps) {
	const {
		activeFolder = '',
		setActiveTab = () => {},
		activeTab = {},
		tagOptions = [],
		userId = '',
		firestore = {},
		viewType = '',
		isBotSession = false,
		setIsBotSession = () => {},
		workPrefernceLoading = false,
		mailsToBeShown = [],
		throttledGetCount = () => {},
		isMobile = false,
	} = messageProps;

	const [openPinnedChats, setOpenPinnedChats] = useState(true);
	const [activeAttachmentData, setActiveAttachmentData] = useState({});
	const [searchValue, setSearchValue] = useState('');

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
		activeSubTab  : activeTab?.subTab,
		workPrefernceLoading,
		listOnlyMails : true,
		activeFolder,
		sidFilters    : activeTab?.hiddenFilters?.sid || '',
		mailsToBeShown,
		throttledGetCount,
	});

	const setActiveSubTab = (val) => {
		setActiveTab((prev) => ({ ...prev, subTab: val, data: {} }));
	};

	const resetSidFilter = () => {
		setActiveTab((prev) => ({ ...prev, subTab: 'all', data: {}, tab: 'firebase_emails', hiddenFilters: {} }));
	};

	const { messagesList, sortedPinnedChatList } = chatsData;

	const isPinnedChatEmpty = isEmpty(sortedPinnedChatList);

	const ActiveIcon = openPinnedChats ? IcMArrowRotateDown : IcMArrowRotateRight;

	return (
		<div className={styles.main_container}>
			<Header
				setSearchValue={setSearchValue}
				searchValue={searchValue}
				viewType={viewType}
				tagOptions={tagOptions}
				setAppliedFilters={setAppliedFilters}
				setIsBotSession={setIsBotSession}
				appliedFilters={appliedFilters}
				isBotSession={isBotSession}
				setActiveSubTab={setActiveSubTab}
				activeSubTab={activeTab?.subTab}
				activeTab={activeTab?.tab}
				resetSidFilter={resetSidFilter}
				sidFilter={activeTab?.hiddenFilters?.sid || ''}
			/>

			{(isEmpty(messagesList) && isPinnedChatEmpty && !loadingState?.chatsLoading)
				? (
					<div className={styles.list_container}>
						<div className={styles.empty_state}>
							No Messages Yet..
						</div>
					</div>
				) : (
					<div
						onScroll={handleScroll}
						className={styles.list_container}
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
													isBotSession={isBotSession}
													setActiveMessage={setActiveMessage}
													activeTab={activeTab}
													viewType={viewType}
													activeFolder={activeFolder}
													setActiveAttachmentData={setActiveAttachmentData}
												/>
											),
										)}
									</div>
								)}
							</>
						)}

						<div className={styles.recent_text}>
							Recent
						</div>

						{(messagesList || []).map(
							(item) => (
								<MessageCardData
									key={item?.id}
									item={item}
									userId={userId}
									firestore={firestore}
									setActiveMessage={setActiveMessage}
									activeTab={activeTab}
									viewType={viewType}
									activeFolder={activeFolder}
									setActiveAttachmentData={setActiveAttachmentData}
								/>
							),
						)}

						{loadingState?.chatsLoading && <LoadingState />}
					</div>
				)}
			<ViewAttachmentsModal
				activeAttachmentData={activeAttachmentData}
				setActiveAttachmentData={setActiveAttachmentData}
				urlType="urlBased"
				handleDownload={getDownloadFiles}
				isMobile={isMobile}
			/>
		</div>
	);
}

export default FirebaseEmails;
