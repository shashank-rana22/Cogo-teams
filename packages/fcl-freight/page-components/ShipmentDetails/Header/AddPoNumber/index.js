import React, { useState } from 'react';
import { Button } from '@cogoport/components';
import Layout from '@cogo/bookings/commons/Layout';
import { useFormCogo } from '@cogoport/front/hooks';
import useAddPoNumber from '@cogo/bookings/ShipmentDetails/hooks/useAddPoNumber';
import { controls } from './controls';
import { Container, Heading, ButtonWrap, Form } from './styles';

const AddPoNumber = ({
	setOpen = () => { },
	shipment_data = {},
	refetch = () => { },
}) => {
	const { loading, onCreate } = useAddPoNumber({
		shipment_data,
		setOpen,
		refetch,
	});
	const [errors, setErrors] = useState({});
	const { fields, handleSubmit } = useFormCogo(controls);

	return (
		<Container>
			<Form>
				<Heading>ADD PO NUMBER</Heading>

				<Layout
					themeType="admin"
					fields={fields}
					controls={controls}
					errors={errors}
				/>
			</Form>

			<ButtonWrap>
				<Button
					className="secondary md"
					style={{ marginRight: '12px' }}
					onClick={() => setOpen(false)}
				>
					Cancel
				</Button>

				<Button disabled={loading} onClick={handleSubmit(onCreate, setErrors)}>
					{loading ? 'Submiting...' : 'Submit'}
				</Button>
			</ButtonWrap>
		</Container>
	);
};

export default AddPoNumber;
