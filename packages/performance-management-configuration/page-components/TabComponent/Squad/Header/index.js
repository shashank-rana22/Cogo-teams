import { Button } from '@cogoport/components';

import SearchInput from '../../../../commons/SearchInput';

import styles from './styles.module.css';

function Header({ search, setSearch }) {
	return (
		<div className={styles.container}>
			<div className={styles.input_bar}>
				<SearchInput
					value={search}
					onChange={(val) => setSearch(val)}
					size="md"
					placeholder="Search for Squad"
				/>
			</div>

			<Button>
				Add Squad
			</Button>
		</div>

	);
}

export default Header;
