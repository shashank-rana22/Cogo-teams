import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

type SizeProps = 'lg' | 'xs' | 'sm' | 'md';

function SearchInput({
	value = '',
	onChange = (v) => v,
	placeholder = '',
	size = 'lg',
}) {
	return (
		<section className={styles.container}>
			<Input
				prefix={<IcMSearchlight />}
				value={value}
				onChange={(val) => onChange(val)}
				size={size as SizeProps}
				placeholder={placeholder}
			/>
		</section>
	);
}

export default SearchInput;
