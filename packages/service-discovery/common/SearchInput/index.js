import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function SearchInput({
	value = '',
	onChange = () => {},
	style = {},
	placeholder = '',
	size = 'md',
}) {
	return (
		<section className={styles.container} style={style}>
			<Input
				prefix={<IcMSearchlight />}
				value={value}
				onChange={(val) => onChange(val)}
				size={size}
				placeholder={placeholder}
			/>
		</section>
	);
}

export default SearchInput;
