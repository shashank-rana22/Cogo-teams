import React from 'react';

import styles from './styles.module.css';

function NotInOffice() {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Not in office today
			</div>
			<div className={styles.user_data}>
				<div className={styles.user_detail}>
					<div className={styles.user_avatar}>
						RD
					</div>
					Raghu
				</div>
				<div className={styles.user_detail}>
					<div className={styles.user_avatar}>
						RD
					</div>
					Raghu
				</div>
				<div className={styles.user_detail}>
					<div className={styles.user_avatar}>
						RD
					</div>
					Raghu
				</div>
				<div className={styles.user_detail}>
					<div className={styles.user_avatar}>
						RD
					</div>
					Raghu
				</div>
				<div className={styles.user_detail}>
					<div className={styles.user_avatar}>
						RD
					</div>
					Raghu
				</div>
				<div className={styles.more}>
					+8
				</div>
			</div>
			<div className={styles.absent_deps}>
				2 employees from Product Department are not present today
			</div>
		</div>
	);
}

export default NotInOffice;
