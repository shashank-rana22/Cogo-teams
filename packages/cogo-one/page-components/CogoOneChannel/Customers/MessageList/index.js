import { Input, Popover } from '@cogoport/components';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

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
		updatePin,
		userId,
		sortedPinnedChatList = [],
	} = messageProps;

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

			{ isEmpty(messagesList) && isEmpty(sortedPinnedChatList) && !messagesLoading ? (
				<div className={styles.list_container}>
					<div className={styles.empty_state}>
						No Messages Yet..
					</div>
				</div>
			) : (
				<div className={styles.list_container} onScroll={handleScroll}>
					<div className={styles.pinned_chats_div}>
						{(sortedPinnedChatList || []).map((item) => (
							<MessageCardData
								item={item}
								activeCardId={activeCardId}
								userId={userId}
								setActiveMessage={setActiveMessage}
								updatePin={updatePin}
							/>
						))}
					</div>
					{(messagesList || []).map((item) => (
						<MessageCardData
							item={item}
							activeCardId={activeCardId}
							userId={userId}
							setActiveMessage={setActiveMessage}
							updatePin={updatePin}
						/>
					))}
					{messagesLoading && <LoadingState />}
				</div>
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
