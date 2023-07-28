import { Button, Toggle } from '@cogoport/components';

import ACTIVE_MODE_KEYS_MAPPING from '../../../../constants/active-mode-keys-mapping';

import styles from './styles.module.css';

const { CREATE } = ACTIVE_MODE_KEYS_MAPPING;

function Header(props) {
	const {
		setToggleValue,
		setActiveMode,
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
				onClick={() => setActiveMode(CREATE)}
			>
				+ Create New Objective
			</Button>
		</section>
	);
}

export default Header;
