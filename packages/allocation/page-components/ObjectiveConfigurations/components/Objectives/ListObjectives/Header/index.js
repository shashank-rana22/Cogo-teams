import { Button, Toggle } from '@cogoport/components';

import styles from './styles.module.css';

function Header(props) {
	const {
		setToggleValue,
		setActiveTabDetails,
	} = props;

	return (
		<section className={styles.container}>
			<Toggle
				className={styles.toggle}
				size="md"
				name="active_status"
				offLabel="Active"
				onLabel="Inactive"
				onChange={(event) => (event.target.checked ? setToggleValue('inactive') : setToggleValue('active'))}
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
