import Layout from '@cogoport/bookings/commons/Layout';
import useAddPoNumber from '@cogoport/bookings/ShipmentDetails/hooks/useAddPoNumber';
import { Button } from '@cogoport/components';
import { useFormCogo } from '@cogoport/front/hooks';
import React, { useState } from 'react';

import { controls } from './controls';
import { Container, Heading, ButtonWrap, Form } from './styles';

function AddPoNumber({
	setOpen = () => { },
	shipment_data = {},
	refetch = () => { },
}) {
	const { loading, onCreate } = useAddPoNumber({
		shipment_data,
		setOpen,
		refetch,
	});
	const [errors, setErrors] = useState({});
	const { fields, handleSubmit } = useFormCogo(controls);

	return (
		<div className={styles.container}>
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
		</div>
	);
}

export default AddPoNumber;
