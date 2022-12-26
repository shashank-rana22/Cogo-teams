import { Input } from '@cogoport/components';
import React from 'react';

import SearchSvg from '../../assets/search.svg';

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
				suffix={<SearchSvg />}
				value={value}
				onChange={(value) => onChange(value)}
				size={size}
				placeholder={placeholder}
			/>
		</section>
	);
}

export default SearchInput;
