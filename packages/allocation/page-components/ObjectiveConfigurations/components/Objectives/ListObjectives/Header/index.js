import { Button, Toggle } from '@cogoport/components';

import ACTIVE_MODE_KEYS_MAPPING from '../../../../constants/active-mode-keys-mapping';

import ObjectiveFilters from './ObjectiveFilters';
import styles from './styles.module.css';

const { CREATE } = ACTIVE_MODE_KEYS_MAPPING;

function Header(props) {
	const {
		setToggleValue,
		setActiveMode,
		setParams,
		debounceQuery,
		searchValue,
		setSearchValue,
	} = props;

	return (
		<>
			<div className={styles.container}>
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
			</div>

			<ObjectiveFilters
				setParams={setParams}
				debounceQuery={debounceQuery}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
			/>
		</>
	);
}

export default Header;
