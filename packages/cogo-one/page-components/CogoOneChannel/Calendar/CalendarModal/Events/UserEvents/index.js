import { IcMCall, IcMShip } from '@cogoport/icons-react';
import React from 'react';

// import EmptyList from '../EmptyList';

import styles from './styles.module.css';

const ICON_MAPPING = {
	call_customer: {
		icon  : <IcMCall width={10} height={10} />,
		color : '#FCEEDF',
	},
	send_quotation: {
		icon  : <IcMShip width={10} height={10} />,
		color : '#F3FAFA',
	},
	other: {
		icon  : <IcMShip width={10} height={10} />,
		color : '#F3FAFA',
	},
};
console.log('ICON_MAPPING:', ICON_MAPPING);

// const noData = true;

function UserEvents() {
	const USER_CONTACT_DETAILS = ['Ramesh Naidu', '+91 7893486780', 'ramesh.naidu@gmail.com'];

	// if (noData) {
	// 	return (
	// 		<div className={styles.empty_container}>
	// 			<EmptyList />
	// 		</div>
	// 	);
	// }

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.avatar_container}>
					<div className={styles.avatar}>
						<IcMShip width={20} height={20} />
					</div>
					<div className={styles.time}>
						2:04 PM
					</div>
				</div>
				<div className={styles.details}>
					<div className={styles.business_name}>
						Bajaj International Private Limited
					</div>
					<div className={styles.description}>
						Schedule a demo after 2 pm with Bajaj Group Pvt Ltd on CogoFintech Invoice Discounting
					</div>
					<div className={styles.poc_details}>
						<div className={styles.name}>
							POC :
						</div>
						<div className={styles.poc_data}>
							{(USER_CONTACT_DETAILS || []).map((item) => (
								<div className={styles.contact_details} key={item}>
									{item}
								</div>
							))}

						</div>
					</div>
				</div>
			</div>
			<div className={styles.card}>
				<div className={styles.avatar_container}>
					<div className={styles.avatar}>
						<IcMShip width={20} height={20} />
					</div>
					<div className={styles.time}>
						2:04 PM
					</div>
				</div>
				<div className={styles.details}>
					<div className={styles.business_name}>
						Bajaj International Private Limited
					</div>
					<div className={styles.description}>
						Schedule a demo after 2 pm with Bajaj Group Pvt Ltd on CogoFintech Invoice Discounting
					</div>
					<div className={styles.poc_details}>
						<div className={styles.name}>
							POC :
						</div>
						<div className={styles.poc_data}>
							{(USER_CONTACT_DETAILS || []).map((item) => (
								<div className={styles.contact_details} key={item}>
									{item}
								</div>
							))}

						</div>
					</div>
				</div>
			</div>
			<div className={styles.card}>
				<div className={styles.avatar_container}>
					<div className={styles.avatar}>
						<IcMShip width={20} height={20} />
					</div>
					<div className={styles.time}>
						2:04 PM
					</div>
				</div>
				<div className={styles.details}>
					<div className={styles.business_name}>
						Bajaj International Private Limited
					</div>
					<div className={styles.description}>
						Schedule a demo after 2 pm with Bajaj Group Pvt Ltd on CogoFintech Invoice Discounting
					</div>
					<div className={styles.poc_details}>
						<div className={styles.name}>
							POC :
						</div>
						<div className={styles.poc_data}>
							{(USER_CONTACT_DETAILS || []).map((item) => (
								<div className={styles.contact_details} key={item}>
									{item}
								</div>
							))}

						</div>
					</div>
				</div>
			</div>
			<div className={styles.card}>
				<div className={styles.avatar_container}>
					<div className={styles.avatar}>
						<IcMShip width={20} height={20} />
					</div>
					<div className={styles.time}>
						2:04 PM
					</div>
				</div>
				<div className={styles.details}>
					<div className={styles.business_name}>
						Bajaj International Private Limited
					</div>
					<div className={styles.description}>
						Schedule a demo after 2 pm with Bajaj Group Pvt Ltd on CogoFintech Invoice Discounting
					</div>
					<div className={styles.poc_details}>
						<div className={styles.name}>
							POC :
						</div>
						<div className={styles.poc_data}>
							{(USER_CONTACT_DETAILS || []).map((item) => (
								<div className={styles.contact_details} key={item}>
									{item}
								</div>
							))}

						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserEvents;
