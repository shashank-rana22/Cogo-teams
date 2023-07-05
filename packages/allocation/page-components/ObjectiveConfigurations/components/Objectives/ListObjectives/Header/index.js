import { Button, Toggle } from '@cogoport/components';

import styles from './styles.module.css';

function Header(props) {
	const { setActiveTabDetails } = props;

	return (
		<section className={styles.container}>
			<Toggle
				className={styles.toggle}
				size="md"
				name="active_status"
				offLabel="Active"
				onLabel="Inactive"
				onChange={(item) => console.log('item :: ', item)}
			/>

			<Button
				type="button"
				themeType="primary"
				onClick={() => setActiveTabDetails((pv) => ({ ...pv, mode: 'create' }))}
			>
				+ Create New Objective
			</Button>
		</section>
	);
}

export default Header;
