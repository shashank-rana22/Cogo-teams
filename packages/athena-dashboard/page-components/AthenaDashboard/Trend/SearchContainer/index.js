import { Input, Button } from '@cogoport/components';

import styles from './styles.module.css';

function SearchContainer({ searchValue, setSearchValue, handleClick, loading }) {
	return (
		<div className={styles.search_container}>
			<Input
				size="sm"
				placeholder="Search Here..."
				onChange={setSearchValue}
				value={searchValue}
			/>
			<Button
				size="md"
				themeType="primary"
				onClick={handleClick}
				disabled={loading}
			>
				Search
			</Button>
		</div>
	);
}
export default SearchContainer;
