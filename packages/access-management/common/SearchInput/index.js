import React from 'react';
import Input from '@cogoport/front/components/Input';
import SearchSvg from '../../assets/search.svg';
import { Container } from './styles';

const SearchInput = ({
	value = '',
	onChange = () => {},
	placeholder = '',
	size = 'lg',
}) => (
	<Container>
		<Input
			suffix={<SearchSvg />}
			value={value}
			onChange={(event) => onChange(event.target.value)}
			size={size}
			placeholder={placeholder}
		/>
	</Container>
);

export default SearchInput;
