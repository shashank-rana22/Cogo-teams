import React from 'react';

import styles from '../styles.module.css';
import UserInfo from '../UserInfo';

// import Loader from './Loader';

function Step1({
	loading = false,
	userList = [],
	setModalIsOpen = () => {},
	setOTPModal = () => {},
	setSelectedUser = () => {},
	selectedUser = {},
	invoice = {},
}) {
	return (
		<div>
			<div className={styles.Title}>Select user to send OTP</div>

			{/* {loading ? (
				<Loader />
			) : ( */}
			<div className={styles.Container}>
				<UserInfo
					list={userList}
					setModalIsOpen={setModalIsOpen}
					setOTPModal={setOTPModal}
					invoice={invoice}
					setSelectedUser={setSelectedUser}
					selectedUser={selectedUser}
				/>
			</div>
			{/* )} */}
		</div>
	);
}

export default Step1;
