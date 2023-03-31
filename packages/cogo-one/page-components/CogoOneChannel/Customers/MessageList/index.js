import { cl, Input, Popover, Tooltip } from '@cogoport/components';
import { IcCPin, IcMPin, IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import UserAvatar from '../../../../common/UserAvatar';
import { PLATFORM_MAPPING, ECLAMATION_SVG } from '../../../../constants';
import dateTimeConverter from '../../../../utils/dateTimeConverter';
import getActiveCardDetails from '../../../../utils/getActiveCardDetails';
import FilterComponents from '../FilterComponents';
import LoadingState from '../LoadingState';
import NewWhatsappMessage from '../NewWhatsappMessage';

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
	} = messageProps;

	function lastMessagePreview(previewData = '') {
		return (
			<div
				className={styles.content}
				dangerouslySetInnerHTML={{ __html: previewData }}
			/>
		);
	}

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

			{ isEmpty(messagesList) && !messagesLoading ? (
				<div className={styles.list_container}>
					<div className={styles.empty_state}>
						No Messages Yet..
					</div>
				</div>
			) : (
				<div className={styles.list_container} onScroll={handleScroll}>
					{(messagesList || []).map((item) => {
						const {
							user_name = '',
							organization_name = '',
							user_type = '',
							search_user_name = '',
							chat_tags = [], chat_status = '',
							id = '',
							channel_type = '',
							new_message_sent_at = '',
							pinnedTime = {},
							last_message = '',
							new_message_count = 0,
						} = getActiveCardDetails(item) || {};

						const isImportant = chat_tags?.includes('important') || false;
						const lastActive = new Date(new_message_sent_at);
						const checkActiveCard = activeCardId === id;

						const { renderTime } = dateTimeConverter(
							Date.now() - Number(lastActive),
							Number(lastActive),
						);

						const showOrganization = () => {
							if ((user_name?.toLowerCase() || '').includes('anonymous')) {
								return startCase(PLATFORM_MAPPING[user_type] || '');
							}
							return startCase(organization_name);
						};

						return (
							<div
								key={id}
								role="presentation"
								className={cl`
											${styles.card_container} 
											${checkActiveCard ? styles.active_card : ''} 
											${isImportant ? styles.important_styles : ''}
												`}
								onClick={() => setActiveMessage(item)}
							>
								<div className={styles.card}>
									<div className={styles.user_information}>
										<div className={styles.avatar_container}>
											<UserAvatar
												type={channel_type}
											/>
											<div className={styles.user_details}>
												<div className={styles.name_container}>
													<Tooltip
														content={startCase(search_user_name) || 'User'}
														placement="top"
													>
														<div className={styles.user_name}>
															{startCase(search_user_name) || 'User'}
														</div>
													</Tooltip>
													{pinnedTime[userId] > 0
														? (
															<IcCPin
																onClick={(e) => {
																	updatePin({
																		pinnedID    : id,
																		channelType : channel_type,
																		type        : 'unpin',
																	});
																	e.stopPropagation();
																}}
															/>
														) : (
															<IcMPin
																onClick={(e) => {
																	updatePin({
																		pinnedID    : id,
																		channelType : channel_type,
																		type        : 'pin',
																	});
																	e.stopPropagation();
																}}
															/>
														)}
												</div>
												<div className={styles.organisation}>
													{showOrganization()}
												</div>
											</div>
										</div>

										<div className={styles.user_activity}>
											<div className={styles.tags_conatiner}>
												{!isEmpty(chat_status) && (
													<div
														className={cl`
																${styles.tags}
																${chat_status === 'warning' ? styles.warning : ''}
																${chat_status === 'escalated' ? styles.escalated : ''}
															`}
													>
														{startCase(chat_status)}
													</div>
												)}
											</div>
											<div className={styles.activity_duration}>
												{renderTime}
											</div>
										</div>
									</div>

									<div className={styles.content_div}>
										{lastMessagePreview(last_message || '')}
										{new_message_count > 0 && (
											<div className={styles.new_message_count}>
												{new_message_count > 100 ? '99+' : (
													new_message_count
												)}
											</div>
										)}
									</div>
								</div>
								{isImportant && (

									<div className={styles.important_icon}>
										<img
											src={ECLAMATION_SVG}
											alt="important"
											width="12px"
										/>
									</div>
								)}
							</div>
						);
					})}
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
