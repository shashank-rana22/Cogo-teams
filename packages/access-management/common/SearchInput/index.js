import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function SearchInput({
	value = '',
	onChange = () => {},
	placeholder = '',
	size = 'lg',
}) {
	return (
		<section className={styles.container}>
			<Input
				inputIcon={<IcMSearchlight />}
				suffixInline
				value={value}
				onChange={(value) => onChange(value)}
				size={size}
				placeholder={placeholder}
			/>
		</section>
	);
}

export default SearchInput;
