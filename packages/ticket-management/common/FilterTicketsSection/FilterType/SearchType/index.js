import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SearchType(props) {
	const { searchParams, setSearchParams } = props;

	return (
		<div className={styles.search_container}>
			<Input
				size="sm"
				prefix={(
					<IcMSearchlight
						width={16}
						height={16}
						className={styles.search_icon}
					/>
				)}
				placeholder="Search here..."
				value={searchParams.text}
				onChange={(val) => setSearchParams((prev) => ({
					...prev,
					text: val,
				}))}
			/>
		</div>
	);
}

export default SearchType;
