import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SearchInput(props) {
	const {
		value = '',
		placeholder = '',
		size = 'lg',
		setGlobalSearch = () => {},
		debounceQuery,
		disabled,
		...rest
	} = props;

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
				disabled={disabled}
				{...rest}
			/>
		</div>
	);
}

export default SearchInput;
