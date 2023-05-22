import { Avatar, Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const src = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800';

function Header({ detail }) {
	const { name, employee_code, designation, passport_size_photo_url } = detail || {};
	console.log('detail', detail);
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
					<div className={styles.name}>{name}</div>
					<div className={styles.role}>{startCase(designation)}</div>
					<div className={styles.emp_code}>
						Employee Code:
						{' '}
						{employee_code}
					</div>
				</div>
			</div>

			<div className={styles.button_container}>
				<Button type="button" themeType="secondary">Action Button</Button>
				<Button type="button" themeType="secondary" style={{ marginLeft: 12 }}>Action Button</Button>
				<Button type="button" style={{ marginLeft: 12 }}>Action Button</Button>
			</div>
		</div>
	);
}

export default Header;
