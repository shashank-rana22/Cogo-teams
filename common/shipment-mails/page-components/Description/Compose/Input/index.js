import React from 'react';
import InputCore from '@cogo/business-modules/form/components/Controlled/InputController';
import { Container, Prefix, Row } from './styles';

export const Input = ({ prefix, suffix = null, ...rest }) => {
	return (
		<Container>
			<Row>
				<Prefix>{prefix}</Prefix>
				<InputCore {...rest} />
			</Row>
			{suffix}
		</Container>
	);
};

export default Input;
