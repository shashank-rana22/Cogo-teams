import { Input } from '@cogoport/components';
import { IcMSearchlight, IcMCross } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function SearchInput({
	value = '',
	onSearch = () => {},
	style = {},
	placeholder = '',
	size = 'md',
	onReset = () => {},
}) {
	return (
		<section className={styles.container} style={style}>
			<Input
				prefix={<IcMSearchlight />}
				value={value}
				onChange={(val) => onSearch(val)}
				size={size}
				placeholder={placeholder}
				{...(value ? {
					suffix: <IcMCross
						className={styles.cross_icon}
						onClick={onReset}
					/>,
				} : {})}
			/>
		</section>
	);
}

export default SearchInput;
