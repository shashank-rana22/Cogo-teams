import { cl, Input, Popover } from '@cogoport/components';
import { IcMDoubleFilter, IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

// import TooltipInformation from '../../common/TooltipInformation';
import UserAvatar from '../../common/UserAvatar';

import FilterComponents from './FilterComponents';
import styles from './styles.module.css';

function Customers({
	setActiveCard = () => {},
	activeCard,
	setSearchValue = () => {},
	searchValue,
	setFilterVisible = () => {},
	filterVisible,
	// fields,
	reset,
}) {
	// const LIST = [
	// 	{
	// 		label: 'green',

	// 	},	{
	// 		label: 'green',

	// 	}, {
	// 		label: 'green',

	// 	},
	// 	{
	// 		label: 'green',

	// 	},	{
	// 		label: 'green',

	// 	}, {
	// 		label: 'green',

	// 	},
	// 	{
	// 		label: 'green',

	// 	},	{
	// 		label: 'green',

	// 	}, {
	// 		label: 'green',

	// 	},

	// ];

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
	];

	// const pillsData = LIST.slice(0, 3);

	useEffect(() => {
		if (!isEmpty(dummyData)) {
			setActiveCard(dummyData?.[0]);
		}
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.source_types}>

					<div>
						{/* {pillsData.map((item) => (
							<Pill
								size="md"
								color="#FEF3E9"
							>
								{startCase(item.label)}
							</Pill>
						))} */}
						<Input
							size="sm"
							prefix={<IcMSearchlight width={22} height={22} />}
							placeholder="Search here..."
							value={searchValue}
							onChange={(val) => setSearchValue(val)}
							style={{ width: 200 }}
						/>
					</div>

					{/* <div className={styles.more_counts}>
						<TooltipInformation />
					</div> */}

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
						<IcMDoubleFilter width={25} height={25} onClick={() => setFilterVisible(!filterVisible)} />
					</Popover>

				</div>
			</div>
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
								<div className={styles.activity_duration}>
									{item.status}
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
	);
}

export default Customers;
