import { cl } from '@cogoport/components';
import React from 'react';

import { VOICE_ICON_MAPPING } from '../../../constants';

import styles from './styles.module.css';

function VoiceList({ activeCard, setActiveCard }) {
	const dummyData = [
		{
			id           : 1,
			name         : 'John Wick',
			organisation : 1,
			pills        : ['Medium', 'Pre Shipment', 'Escalated', 'Medium', 'Medium', 'Medium'],
			status       : 'tues',
			source       : 'missed',
			image        : 'https://www.w3schools.com/howto/img_avatar.png',

		},
		{
			id           : 2,
			name         : 'John Wick',
			organisation : 10,
			pills        : ['Medium', 'Pre Shipment', 'Escalated', 'Medium', 'Medium', 'Medium'],
			status       : 'wed',
			source       : 'disconnected',
			image        : '',

		},
		{
			id           : 3,
			name         : 'John Wick',
			organisation : 2,
			pills        : ['Medium', 'Pre Shipment', 'Escalated', 'Medium', 'Medium', 'Medium'],
			status       : 'tues',
			source       : 'outgoing',
			image        : 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png',

		},
		{
			id           : 4,
			name         : 'John Wick',
			organisation : 7,
			pills        : ['Medium', 'Pre Shipment', 'Escalated', 'Medium', 'Medium', 'Medium'],
			status       : 'tues',
			source       : 'incomming',
			image        : 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png',

		},
		{
			id           : 1,
			name         : 'John Wick',
			organisation : 1,
			pills        : ['Medium', 'Pre Shipment', 'Escalated', 'Medium', 'Medium', 'Medium'],
			status       : 'tues',
			source       : 'missed',
			image        : 'https://www.w3schools.com/howto/img_avatar.png',

		},
		{
			id           : 2,
			name         : 'John Wick',
			organisation : 10,
			pills        : ['Medium', 'Pre Shipment', 'Escalated', 'Medium', 'Medium', 'Medium'],
			status       : 'wed',
			source       : 'disconnected',
			image        : '',

		},
		{
			id           : 3,
			name         : 'John Wick',
			organisation : 2,
			pills        : ['Medium', 'Pre Shipment', 'Escalated', 'Medium', 'Medium', 'Medium'],
			status       : 'tues',
			source       : 'outgoing',
			image        : 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png',

		},
		{
			id           : 4,
			name         : 'John Wick',
			organisation : 7,
			pills        : ['Medium', 'Pre Shipment', 'Escalated', 'Medium', 'Medium', 'Medium'],
			status       : 'tues',
			source       : 'incomming',
			image        : 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png',

		},
		{
			id           : 3,
			name         : 'John Wick',
			organisation : 2,
			pills        : ['Medium', 'Pre Shipment', 'Escalated', 'Medium', 'Medium', 'Medium'],
			status       : 'tues',
			source       : 'outgoing',
			image        : 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png',

		},
		{
			id           : 4,
			name         : 'John Wick',
			organisation : 7,
			pills        : ['Medium', 'Pre Shipment', 'Escalated', 'Medium', 'Medium', 'Medium'],
			status       : 'tues',
			source       : 'incomming',
			image        : 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png',

		},
		{
			id           : 3,
			name         : 'John Wick',
			organisation : 2,
			pills        : ['Medium', 'Pre Shipment', 'Escalated', 'Medium', 'Medium', 'Medium'],
			status       : 'tues',
			source       : 'outgoing',
			image        : 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png',

		},
		{
			id           : 4,
			name         : 'John Wick',
			organisation : 7,
			pills        : ['Medium', 'Pre Shipment', 'Escalated', 'Medium', 'Medium', 'Medium'],
			status       : 'tues',
			source       : 'incomming',
			image        : 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png',

		},
	];
	return (
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
									<img
										src={VOICE_ICON_MAPPING[item.source]}
										className={styles.avatar}
										alt=""
									/>
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
									<div className={styles.activity_duration}>
										Friday
									</div>
									<div className={styles.activity_duration}>
										11.23 pm
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

	);
}

export default VoiceList;
