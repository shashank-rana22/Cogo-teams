import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React from 'react';

function SearchInput({
	value = '',
	onChange = () => {},
	placeholder = '',
	size = 'lg',
}) {
	return (
		<section>
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
