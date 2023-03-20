import SelectController from '@cogo/business-modules/form/components/Controlled/SelectController';
import React from 'react';

import { Container, Prefix, Row } from './styles';

export function Select({ prefix, suffix = null, ...rest }) {
	return (
		<Container>
			<Row>
				<Prefix>{prefix}</Prefix>
				<SelectController
					{...rest}
					theme="admin"
					className="primary md"
					caret={false}
				/>
			</Row>
			{suffix}
		</Container>
	);
}

export default Select;
