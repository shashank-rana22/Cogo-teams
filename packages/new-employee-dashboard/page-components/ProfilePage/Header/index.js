import { Avatar } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const src = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800';

function Header() {
	return (
		<div className={styles.container}>
			<div className={styles.profile}>
				<Avatar
					src={src}
					alt="img"
					disabled={false}
					size="160px"
				/>
				<div>
					<div className={styles.name}>Shivam Singh</div>
					<div className={styles.role}>Sr. Software Engineer</div>
					<div className={styles.emp_code}>Employee Code: COGO-0833</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
