import { cl, Input, Popover, Tabs, TabPanel, Toggle } from '@cogoport/components';
import { IcMDoubleFilter, IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import UserAvatar from '../../common/UserAvatar';

import FilterComponents from './FilterComponents';
import InactiveModal from './InactiveModal';
import LoadingState from './LoadingState';
import styles from './styles.module.css';
import VoiceList from './VoiceList';

function Customers({
	setActiveCard = () => {},
	activeCard,
	setSearchValue = () => {},
	searchValue,
	setFilterVisible = () => {},
	filterVisible,
	// fields,
	reset,
	activeTab,
	setActiveTab = () => {},
	setToggleStatus = () => {},
	toggleStatus,
	inactiveReasons,
	setInactiveReasons = () => {},
	setInactiveDate = () => {},
	inactiveDate,
	setInactiveTime = () => {},
	inactiveTime,
}) {
	const dummyData = [
		{
			id           : 1,
			name         : 'John Wick',
			organisation : 1,
			pills        : ['Medium', 'Pre Shipment', 'Escalated', 'Medium', 'Medium', 'Medium'],
			status       : 'tues',
			source       : 'whatsapp',
			image        : 'https://www.w3schools.com/howto/img_avatar.png',
			content      : 'My name is cogoassist, Cogoport where we will show',
		},
		{
			id           : 2,
			name         : 'John Wick',
			organisation : 10,
			pills        : ['Medium', 'Pre Shipment', 'Escalated', 'Medium', 'Medium', 'Medium'],
			status       : 'wed',
			source       : 'whatsapp',
			image        : '',
			content      : 'My name is cogoassist, Cogoport where we will show Cogoport where we will show',
		},
		{
			id           : 3,
			name         : 'John Wick',
			organisation : 2,
			pills        : ['Medium', 'Pre Shipment', 'Escalated', 'Medium', 'Medium', 'Medium'],
			status       : 'tues',
			source       : 'facebook',
			image        : 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png',
			content      : 'My name is cogoassist, Cogoport where we will show....',
		},
		{
			id           : 4,
			name         : 'John Wick',
			organisation : 7,
			pills        : ['Medium', 'Pre Shipment', 'Escalated', 'Medium', 'Medium', 'Medium'],
			status       : 'tues',
			source       : 'facebook',
			image        : 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png',
			content      : 'My name is cogoassist, Cogoport where we will show Cogoport where we will show',
		},
		{
			id           : 1,
			name         : 'John Wick',
			organisation : 1,
			pills        : ['Medium', 'Pre Shipment', 'Escalated', 'Medium', 'Medium', 'Medium'],
			status       : 'tues',
			source       : 'whatsapp',
			image        : 'https://www.w3schools.com/howto/img_avatar.png',
			content      : 'My name is cogoassist, Cogoport where we will show',
		},
		{
			id           : 2,
			name         : 'John Wick',
			organisation : 10,
			pills        : ['Medium', 'Pre Shipment', 'Escalated', 'Medium', 'Medium', 'Medium'],
			status       : 'wed',
			source       : 'whatsapp',
			image        : '',
			content      : 'My name is cogoassist, Cogoport where we will show Cogoport where we will show',
		},
		{
			id           : 3,
			name         : 'John Wick',
			organisation : 2,
			pills        : ['Medium', 'Pre Shipment', 'Escalated', 'Medium', 'Medium', 'Medium'],
			status       : 'tues',
			source       : 'facebook',
			image        : 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png',
			content      : 'My name is cogoassist, Cogoport where we will show....',
		},
		{
			id           : 4,
			name         : 'John Wick',
			organisation : 7,
			pills        : ['Medium', 'Pre Shipment', 'Escalated', 'Medium', 'Medium', 'Medium'],
			status       : 'tues',
			source       : 'facebook',
			image        : 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png',
			content      : 'My name is cogoassist, Cogoport where we will show Cogoport where we will show',
		},
	];

	useEffect(() => {
		if (!isEmpty(dummyData)) {
			setActiveCard(dummyData?.[0]);
		}
	}, []);

	const loading = false;
	return (
		<div className={styles.container}>

			<div className={styles.filters_container}>
				<div className={styles.title}>
					CogoOne
				</div>
				<Toggle
					name="a1"
					size="md"
					showOnOff
					onChange={() => setToggleStatus((p) => !p)}
					value={toggleStatus}
				/>
			</div>

			<div className={styles.tabs}>
				<Tabs
					activeTab={activeTab}
					fullWidth
					themeType="secondary"
					onChange={setActiveTab}
				>
					<TabPanel name="message" title="Message" />

					<TabPanel name="voice" title="Voice" />
				</Tabs>
			</div>

			{activeTab === 'message' && (
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
			)}

			{activeTab === 'message' && (
				<div>
					{loading ? <LoadingState /> : (
						<div className={styles.list_container}>

							{(dummyData || []).map((item) => {
								const checkActiveCard = activeCard?.id === item?.id;
								return (
									<div
										role="presentation"
										className={cl`
						${styles.card_Container} 
						${checkActiveCard ? styles.active_card : ''} 
						 `}
										onClick={() => setActiveCard(item)}
									>
										<div className={styles.card}>

											<div className={styles.user_information}>
												<div className={styles.avatar_Container}>
													<UserAvatar type={item.source} imageSource={item.image} />
													<div className={styles.user_details}>
														<div className={styles.user_name}>
															{item.name}
														</div>
														<div className={styles.organisation}>
															Organisation
															{' '}
															{item.organisation}
														</div>
													</div>
												</div>

												<div className={styles.user_activity}>
													<div className={styles.pills_card}>Small</div>
													<div className={styles.activity_duration}>
														{item.status}
													</div>
												</div>

											</div>
											<div className={styles.content}>
												{item.content}
											</div>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>
			)}

			{activeTab === 'voice' && (
				<VoiceList
					setActiveCard={setActiveCard}
					activeCard={activeCard}
				/>
			)}

			{toggleStatus && (
				<InactiveModal
					toggleStatus={toggleStatus}
					setToggleStatus={setToggleStatus}
					inactiveReasons={inactiveReasons}
					setInactiveReasons={setInactiveReasons}
					setInactiveDate={setInactiveDate}
					inactiveDate={inactiveDate}
					setInactiveTime={setInactiveTime}
					inactiveTime={inactiveTime}
				/>
			)}
		</div>
	);
}

export default Customers;
