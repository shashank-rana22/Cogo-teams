import { cl, Input, Popover, Tooltip } from '@cogoport/components';
import { IcMFilter, IcMSearchlight, IcMDocument } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import UserAvatar from '../../../../common/UserAvatar';
import { PLATFORM_MAPPING } from '../../../../constants';
import dateTimeConverter from '../../../../utils/dateTimeConverter';
import getActiveCardDetails from '../../../../utils/getActiveCardDetails';
import FilterComponents from '../FilterComponents';
import LoadingState from '../LoadingState';

import styles from './styles.module.css';

function MessageList({
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
	setActiveCardId = () => {},
	showBotMessages = false,
	setShowBotMessages = () => {},
}) {
	function getShowChat({ user_name }) {
		if (searchValue) {
			const searchName = user_name?.toLowerCase();
			return searchName?.includes(searchValue?.toLowerCase());
		}

		return true;
	}

	if (messagesLoading) {
		return <LoadingState />;
	}

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
									setActiveCardId={setActiveCardId}
									setShowBotMessages={setShowBotMessages}
									showBotMessages={showBotMessages}
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
					{(!isEmpty(appliedFilters) || showBotMessages) && <div className={styles.filters_applied} />}
				</div>
			</div>

			{ isEmpty(messagesList) ? (
				<div className={styles.list_container}>
					<div className={styles.empty_state}>
						No Messages Yet..
					</div>
				</div>
			) : (
				<div className={styles.list_container}>
					{(messagesList || []).map((item) => {
						const { chat_status = '' } = item || {};
						const userData = getActiveCardDetails(item);
						const {
							user_name = '',
							organization_name = '',
							user_type = '',
						} = userData || {};

						const lastActive = new Date(item.new_message_sent_at);
						const checkActiveCard = activeCardId === item?.id;

						const showOrganization = () => {
							if ((user_name?.toLowerCase() || '').includes('anonymous')) {
								return startCase(PLATFORM_MAPPING[user_type] || '');
							}
							return startCase(organization_name);
						};

						const show = getShowChat({ user_name, item, appliedFilters, searchValue });

						return (
							show && (
								<div
									key={item?.id}
									role="presentation"
									className={cl`
												${styles.card_container} 
												${checkActiveCard ? styles.active_card : ''} 
												`}
									onClick={() => setActiveMessage(item)}
								>
									<div className={styles.card}>
										<div className={styles.user_information}>
											<div className={styles.avatar_container}>
												<UserAvatar
													type={item.channel_type}
													imageSource={item.image}
												/>
												<div className={styles.user_details}>
													<Tooltip content={startCase(user_name) || 'User'} placement="top">
														<div className={styles.user_name}>
															{startCase(user_name) || 'User'}
														</div>
													</Tooltip>

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
													{dateTimeConverter(
														Date.now() - Number(lastActive),
														Number(lastActive),
													)?.renderTime}
												</div>
											</div>
										</div>

										<div className={styles.content_div}>
											{item?.last_message
												? lastMessagePreview(item?.last_message || '')
												: (
													<div className={styles.media_preview}>
														<IcMDocument width={20} height={20} fill="#4f4f4f" />
														Media
													</div>
												)}
											{item.new_message_count > 0 && (
												<div className={styles.new_message_count}>
													{item.new_message_count > 100 ? '99+' : (
														item.new_message_count
													)}
												</div>
											)}
										</div>
									</div>
								</div>
							)
						);
					})}
				</div>
			)}
		</>
	);
}

export default MessageList;
