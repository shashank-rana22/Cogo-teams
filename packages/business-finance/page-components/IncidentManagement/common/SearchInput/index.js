import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function SearchInput({
	value = '',
	onChange = (v) => v,
	placeholder = '',
	size = 'lg',
}) {
	return (
		<section className={styles.container}>
			<Input
				suffix={(
					<div className={styles.suffix}>
						<IcMSearchlight height={15} width={15} />
					</div>
				)}
				value={value}
				onChange={(val) => onChange(val)}
				size={size}
				placeholder={placeholder}
			/>
		</section>
	);
}

export default SearchInput;
