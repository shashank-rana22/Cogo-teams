/* eslint-disable react/jsx-no-useless-fragment */
import { cl, Input, Popover } from '@cogoport/components';
import { IcMDoubleFilter, IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import UserAvatar from '../../../common/UserAvatar';
import dateTimeConverter from '../../../utils/dateTimeConverter';
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
}) {
	console.log('messagesList', messagesList);
	const loading = false;

	if (isEmpty(messagesList)) {
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
			{loading ? <LoadingState /> : (
				<div className={styles.list_container}>

					{(messagesList || []).map((item) => {
						const lastActive = new Date(item.sent_updated_at);
						const checkActiveCard = activeMessageCard?.id === item?.id;

						return (
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
													{isEmpty(item?.name)
														? item.user_id
														: startCase(item.name)}
												</div>
												<div className={styles.organisation}>
													{item?.organization_name}
												</div>
											</div>
										</div>

										<div className={styles.user_activity}>
											<div className={styles.tags_conatiner}>
												{/* <div className={styles.pills_card}>Small</div> */}
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
						);
					})}
				</div>
			)}

		</>
	);
}

export default MessageList;
