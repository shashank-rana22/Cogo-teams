import { Button, Input } from '@cogoport/components';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.container}>
			<div>Ticket Configuration</div>
			<div className={styles.right_section_container}>
				<Button themeType="secondary" className={styles.filter_button}><IcMFilter /></Button>
				<div className={styles.search_bar_container}>
					<Input prefix={<IcMSearchlight />} size="sm" placeholder="Search by Name" />
				</div>
				<Button
					themeType="secondary"
					size="md"
					className={styles.configure_category_button}
				>
					Configure Category
				</Button>
				<Button themeType="accent" size="md">Create New Ticket</Button>
			</div>
		</div>
	);
}

export default Header;
