import { cl, Input, Popover } from '@cogoport/components';
import { IcMDoubleFilter, IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import UserAvatar from '../../../../common/UserAvatar';
import getShowChat from '../../../../helpers/getShowChat';
import dateTimeConverter from '../../../../utils/dateTimeConverter';
import getActiveCardDetails from '../../../../utils/getActiveCardDetails';
import FilterComponents from '../FilterComponents';
import LoadingState from '../LoadingState';

import styles from './styles.module.css';

function MessageList({
	messagesList,
	setActiveMessage = () => { },
	activeMessageCard,
	setSearchValue = () => { },
	filterVisible,
	searchValue,
	setFilterVisible = () => { },
	setAppliedFilters = () => { },
	appliedFilters,
	messagesLoading = false,
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
						<IcMDoubleFilter
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
						const userData = getActiveCardDetails(item);
						const {
							user_name = '',
							organization_name = '',
						} = userData || {};

						const lastActive = new Date(item.sent_updated_at);
						const checkActiveCard = activeMessageCard?.id === item?.id;

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
														{startCase(organization_name)}
													</div>
												</div>
											</div>

											<div className={styles.user_activity}>
												<div className={styles.tags_conatiner} />
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
