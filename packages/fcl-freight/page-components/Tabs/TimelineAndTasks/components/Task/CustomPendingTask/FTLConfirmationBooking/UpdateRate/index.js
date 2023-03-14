import React from 'react';
import FormLayout from '../../../../../../commons/Layout';
import { Container } from '../styles';

const UpdateRate = (props) => {
	const { useEditQuoteData, errors } = props;

	const { controls, fields, customValues } = useEditQuoteData;

	return (
		<Container>
			<FormLayout
				controls={controls}
				fields={fields}
				errors={errors}
				customValues={customValues}
			/>
		</Container>
	);
};

export default UpdateRate;
