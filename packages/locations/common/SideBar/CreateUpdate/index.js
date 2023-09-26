import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useRef } from 'react';

import useCreateUpdate from '../../../hooks/useCreateUpdate';

import Form from './Form';

function CreateUpdateForm({ item = {} }) {
	const { t } = useTranslation(['locations']);

	const formRef = useRef(null);

	const onSubmit = () => {
		formRef.current.formSubmit();
	};
	const {
		loading,
		onCreate,
	} = useCreateUpdate();
	const handleSubmitForm = ({ data }) => {
		onCreate({ data });
	};

	return (
		<div>
			<Form ref={formRef} handleSubmitForm={handleSubmitForm} item={item} />
			<Button
				disabled={loading}
				onClick={onSubmit}
				type="submit"
			>
				{t('locations:submit_button')}

			</Button>
		</div>
	);
}
export default CreateUpdateForm;
