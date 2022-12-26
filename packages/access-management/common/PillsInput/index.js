import React from 'react';
import { Pills } from '@cogoport/front/components';
import { Container } from './styles';

const PillsInput = (props) => (
	<Container>
		<Pills {...props} />
	</Container>
);

export default PillsInput;
