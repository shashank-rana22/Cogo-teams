import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SearchInput({
	value = '',
	placeholder = '',
	size = 'lg',
	setGlobalSearch = () => {},
	debounceQuery,
}) {
	const handleGlobalSearch = (val) => {
		setGlobalSearch(val);

		debounceQuery(val);
	};

	return (
		<div className={styles.container}>
			<Input
				prefix={<IcMSearchlight />}
				value={value}
				onChange={(val) => handleGlobalSearch(val)}
				size={size}
				placeholder={placeholder}
			/>
		</div>
	);
}

export default SearchInput;
