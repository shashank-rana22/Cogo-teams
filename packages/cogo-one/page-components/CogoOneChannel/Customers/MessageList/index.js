import { Input, Popover, Button, cl } from '@cogoport/components';
import {
	IcMFilter,
	IcMSearchlight,
	IcMArrowRotateRight,
	IcMArrowRotateDown,
	IcMArrowBack,
	// IcMCross,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useBulkAssignChat from '../../../../hooks/useBulkAssignChat';
import FilterComponents from '../FilterComponents';
import LoadingState from '../LoadingState';
import NewWhatsappMessage from '../NewWhatsappMessage';

import MessageCardData from './MessageCardData';
import styles from './styles.module.css';

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
	} = messageProps;
	const [openPinnedChats, setOpenPinnedChats] = useState(true);
	const [autoAssignChats, setAutoAssignChats] = useState(true);
	const [selectedAutoAssign, setSelectedAutoAssign] = useState({});

	const handleCheckedChats = (item, id) => {
		const chatIDs = Object.keys(selectedAutoAssign);

		if (!chatIDs.includes(id)) {
			setSelectedAutoAssign({ ...selectedAutoAssign, [id]: item });
		} else if (chatIDs.includes(id)) {
			delete (selectedAutoAssign[id]);
			setSelectedAutoAssign((p) => {
				const temp = p;
				delete (temp[id]);
				return { ...p };
			});
		}
	};

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
	}, [showBotMessages]);

	const ActiveIcon = openPinnedChats ? IcMArrowRotateDown : IcMArrowRotateRight;
	const isPinnedChatEmpty = isEmpty(sortedPinnedChatList) || false;
	return (
		<>
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
								/>
							)
						)}
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
					{showBotMessages && (
						<div className={cl`${styles.auto_assign_container}
						${!autoAssignChats && styles.auto_assign_background}
						`}
						>
							{ autoAssignChats ? (
								<Button
									id="auto-assign-chats"
									className="auto-assign-chats"
									size="sm"
									themeType="secondary"
									onClick={() => { setAutoAssignChats(false); }}
								>
									Auto Assign Chats
								</Button>
							) : (
								<div className={styles.show_auto_assign}>
									<div className={styles.icon_container}>
										<IcMArrowBack
											onClick={handleAutoAssignBack}
										/>
									</div>
									{
								isEmpty(selectedAutoAssign)
									? (<div className={styles.select_chats}>Select the Chats to be Auto Assigned.</div>)
									: (
										<>
											<div className={styles.selected_count}>
												<span>
													{ Object.keys(selectedAutoAssign || {}).length || 0}
												</span>

												Selected

											</div>

											<Button
												id="auto-assign"
												size="sm"
												themeType="accent"
												loading={bulkAssignLoading}
												onClick={() => {
													bulkAssignChat({ selectedAutoAssign });
												}}
											>
												Auto Assign
											</Button>

										</>
									)
							}
								</div>
							)}

						</div>
					)}

					<div className={styles.list_container} onScroll={handleScroll}>
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
												item={item}
												activeCardId={activeCardId}
												userId={userId}
												setActiveMessage={setActiveMessage}
												firestore={firestore}
												autoAssignChats={autoAssignChats}
												handleCheckedChats={handleCheckedChats}
											/>
										))}
									</div>
								)}
							</>
						)}
						<div className={styles.recent_text}>Recent</div>
						{(messagesList || []).map((item) => (
							<MessageCardData
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
