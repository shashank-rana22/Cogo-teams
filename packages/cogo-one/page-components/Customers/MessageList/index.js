import { cl, Input, Popover } from '@cogoport/components';
import { IcMDoubleFilter, IcMSearchlight } from '@cogoport/icons-react';
import { format, isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import UserAvatar from '../../../common/UserAvatar';
import FilterComponents from '../FilterComponents';
import LoadingState from '../LoadingState';

import styles from './styles.module.css';

function MessageList({
	messagesList,
	setActiveMessage,
	activeMessageCard,
	setSearchValue,
	filterVisible,
	searchValue,
	setFilterVisible,
	reset,
}) {
	const loading = false;
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
						style={{ width: 200 }}
					/>

				</div>

				<div className={styles.filter_icon}>
					<Popover
						placement="left"
						caret={false}
						render={(
							<FilterComponents
								setFilterVisible={setFilterVisible}
								filterVisible={filterVisible}
						// fields={fields}
								reset={reset}
							/>
						)}
						visible={filterVisible}
					>
						<div className={styles.filter_dot} />
						<IcMDoubleFilter width={25} height={25} onClick={() => setFilterVisible(!filterVisible)} />
					</Popover>

				</div>
			</div>
			{loading ? <LoadingState /> : (
				<div className={styles.list_container}>

					{(messagesList || []).map((item) => {
						const lastActive = new Date(item.sent_updated_at);
						const checkActiveCard = activeMessageCard?.id === item?.id;
						return (
							<div
								role="presentation"
								className={cl`
						                ${styles.card_Container} 
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
													{item.name}
												</div>
												<div className={styles.organisation}>
													{item?.organization_name}
												</div>
											</div>
										</div>

										<div className={styles.user_activity}>
											<div className={styles.pills_card}>Small</div>
											<div className={styles.activity_duration}>
												{format(lastActive, 'hh:mm a')}
											</div>
										</div>

									</div>
									<div className={styles.content}>
										{item.last_message}
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
