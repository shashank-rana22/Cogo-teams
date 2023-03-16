import React from 'react';

import styles from './styles.module.css';

function Header({ subject='' }) {
	return (
		<div className={styles.header_container}>
			<div className={styles.header_subject}>
				{subject}
			</div>
			<div className={styles.header_actions}>
				<div className={styles.header_actions_reply}>

					<img src="https://cdn-icons-png.flaticon.com/512/1933/1933011.png" alt="reply icon" />
				</div>
				<div className={styles.header_actions_reply_all}>

					<img src="https://cdn-icons-png.flaticon.com/512/747/747334.png" alt="reply all icon" />
				</div>
				<div className={styles.header_actions_forward}>

					<img src="https://cdn-icons-png.flaticon.com/512/60/60546.png" alt="reply all icon" />
				</div>
			</div>
		</div>
	);
}

export default Header;
