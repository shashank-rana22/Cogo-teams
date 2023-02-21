import { cl, Input, Popover } from '@cogoport/components';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import UserAvatar from '../../../../common/UserAvatar';
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
}) {
	if (isEmpty(messagesList) && !messagesLoading) {
		return (
			<div className={styles.list_container}>
				<div className={styles.empty_state}>
					No Messages Yet..
				</div>
			</div>
		);
	}

	function getShowChat({
		item = {},
	}) {
		const { user_name = '' } = item;
		if (searchValue) {
			const searchName = user_name?.toLowerCase();
			return searchName?.includes(searchValue);
		}
		return true;
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
					{!isEmpty(appliedFilters) && <div className={styles.filters_applied} />}
				</div>
			</div>

			{messagesLoading ? <LoadingState /> : (
				<div className={styles.list_container}>
					{(messagesList || []).map((item) => {
						const { chat_status = '' } = item || {};
						const userData = getActiveCardDetails(item);
						const {
							user_name = '',
							organization_name = '',
							user_type = '',
						} = userData || {};

						const lastActive = new Date(item.updated_at);
						const checkActiveCard = activeCardId === item?.id;

						const showOrganization = () => {
							if (['public_website', 'public_cp'].includes(user_type)) {
								return startCase(user_type);
							}
							return startCase(organization_name);
						};

						const show = getShowChat({ item, appliedFilters, searchValue });

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
											<div className={styles.avatar_Container}>
												<UserAvatar
													type={item.channel_type}
													imageSource={item.image}
												/>
												<div className={styles.user_details}>
													<div className={styles.user_name}>
														{startCase(user_name)}
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
													{dateTimeConverter(
														Date.now() - Number(lastActive),
														Number(lastActive),
													)?.renderTime}
												</div>
											</div>
										</div>

										<div className={styles.content_div}>
											<div className={styles.content}>
												{item.last_message}
											</div>

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
