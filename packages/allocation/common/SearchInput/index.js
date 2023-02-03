import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SearchInput({
	value = '',
	onChange = () => {},
	placeholder = '',
	size = 'lg',
}) {
	return (
		<div className={styles.container}>
			<Input
				prefix={<IcMSearchlight />}
				value={value}
				onChange={(val) => onChange(val)}
				size={size}
				placeholder={placeholder}
			/>
		</div>
	);
}

export default SearchInput;
