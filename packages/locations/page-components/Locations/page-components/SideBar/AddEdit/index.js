import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useRef } from 'react';

import useCreateLocation from '../../../hooks/useCreateLocation';

import Form from './Form';

function CreateUpdateForm({ item = {}, refetch = () => {}, setSideBar = () => {} }) {
	const { t } = useTranslation(['locations']);

	const formRef = useRef(null);

	const onSubmit = () => {
		formRef.current.formSubmit();
	};
	const {
		loading = false,
		onCreate = () => {},
	} = useCreateLocation({
		refetch: () => {
			refetch();
			setSideBar('');
		},
	});

	const handleSubmitForm = ({ values }) => {
		onCreate({ values });
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
