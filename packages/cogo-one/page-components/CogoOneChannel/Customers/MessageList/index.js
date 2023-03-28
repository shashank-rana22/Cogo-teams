import { cl, Input, Popover, Tooltip } from '@cogoport/components';
import { IcCPin, IcMPin, IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { isEmpty, startCase } from '@cogoport/utils';

import UserAvatar from '../../../../common/UserAvatar';
import { PLATFORM_MAPPING } from '../../../../constants';
import dateTimeConverter from '../../../../utils/dateTimeConverter';
import getActiveCardDetails from '../../../../utils/getActiveCardDetails';
import FilterComponents from '../FilterComponents';
import LoadingState from '../LoadingState';
import NewWhatsappMessage from '../NewWhatsappMessage';

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
	isomniChannelAdmin = false,
	setModalType = () => {},
	modalType = '',
	handleScroll = () => {},
	updatePin = () => {},
}) {
	const { user_data } = useSelector(({ profile }) => ({ user_data: profile || {} }));
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
									isomniChannelAdmin={isomniChannelAdmin}
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
						const { chat_status = '' } = item || {};
						const userData = getActiveCardDetails(item);
						const {
							user_name = '',
							organization_name = '',
							user_type = '',
							search_user_name = '',
						} = userData || {};

						const lastActive = new Date(item.new_message_sent_at);
						const checkActiveCard = activeCardId === item?.id;
						const searchName = search_user_name?.toLowerCase() || '';
						const showOrganization = () => {
							if ((user_name?.toLowerCase() || '').includes('anonymous')) {
								return startCase(PLATFORM_MAPPING[user_type] || '');
							}
							return startCase(organization_name);
						};

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
										<div className={styles.avatar_container}>
											<UserAvatar
												type={item.channel_type}
												imageSource={item.image}
											/>
											<div className={styles.user_details}>
												<Tooltip
													content={startCase(searchName) || 'User'}
													placement="top"
												>
													<div className={styles.user_name}>
														{startCase(searchName) || 'User'}
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
											{(item?.pin?.[user_data.user.id]) > 0
												? (
													<IcCPin
														onClick={(e) => {
															updatePin(item.id, item.channel_type, 'unpin');
															e.stopPropagation();
														}}
													/>
												) : (
													<IcMPin
														onClick={(e) => {
															updatePin(item.id, item.channel_type, 'pin');
															e.stopPropagation();
														}}
													/>
												) }

											<div className={styles.activity_duration}>
												{dateTimeConverter(
													Date.now() - Number(lastActive),
													Number(lastActive),
												)?.renderTime}
											</div>
										</div>
									</div>

									<div className={styles.content_div}>
										{lastMessagePreview(item?.last_message || '')}
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
