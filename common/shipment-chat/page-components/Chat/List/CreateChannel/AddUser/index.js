import { useState } from 'react';
import { useFormCogo } from '@cogoport/front/hooks';
import { Button } from '@cogoport/components';
import FormLayout from '../../../..';
import { controls } from './controls';
import useAddUser from './UseAddUser';

import { Container, Heading, ButtonWrap } from './styles';

function AddUser({ setOpen = () => { }, refetch = () => { } }) {
	const [errors, setErrors] = useState({});
	const { loading, onCreate } = useAddUser({
		setOpen,
		refetch,
	});

	const { fields, handleSubmit } = useFormCogo(controls);

	const onError = (err) => {
		setErrors(err);
	};

	return (
		<Container>
			<Heading>ADD User</Heading>

			<FormLayout
				themeType="admin"
				fields={fields}
				controls={controls}
				errors={errors}
			/>

			<ButtonWrap>
				<Button
					className="secondary md"
					style={{ marginRight: '12px' }}
					onClick={() => setOpen(false)}
					disabled={loading}
				>
					Cancel
				</Button>

				<Button
					className="primary md"
					disabled={loading}
					onClick={handleSubmit(onCreate, onError)}
				>
					{loading ? 'Submiting...' : 'Submit'}
				</Button>
			</ButtonWrap>
		</Container>
	);
}

export default AddUser;
