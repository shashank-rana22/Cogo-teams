import { Button } from '@cogoport/components';

import SearchInput from '../SearchInput';

import styles from './styles.module.css';

function Header({ search, setSearch, label = '', onClickAddButton = () => {} }) {
	const placeholder = `Search for ${label}`;

	return (
		<div className={styles.container}>
			<div className={styles.input_bar}>
				<SearchInput
					value={search}
					onChange={setSearch}
					size="md"
					placeholder={placeholder}
				/>
			</div>

			{label !== 'Employee' && (
				<Button onClick={onClickAddButton}>
					Add
					{' '}
					{label}
				</Button>
			)}

		</div>

	);
}

export default Header;
