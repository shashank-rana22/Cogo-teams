import { Button, Toggle } from '@cogoport/components';

import styles from './styles.module.css';

function Header() {
	return (
		<section className={styles.container}>
			<Toggle
				size="md"
				name="active_status"
				offLabel="Active"
				onLabel="Inactive"
				onChange={(item) => console.log('item :: ', item)}
			/>

			<Button type="button" themeType="primary">
				+ Create New Objective
			</Button>
		</section>
	);
}

export default Header;
