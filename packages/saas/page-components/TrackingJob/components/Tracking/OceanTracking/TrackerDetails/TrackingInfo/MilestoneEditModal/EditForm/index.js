import { useForm } from '@cogoport/forms';
import React, { useImperativeHandle, forwardRef } from 'react';

import Layout from '../../../../../../../../../common/Layout';
import editOceanControls from '../../../../../../../config/edit-details';

function EditForm({
	editDetail = {},
	shipping_line_id = null,
	handleSubmitForm = () => {},
}, ref) {
	const controls = editOceanControls({ editDetail, shipping_line_id });
	const {
		control,
		handleSubmit,
		formState:{ errors = {} },
	} = useForm();

	const onSubmit = (values) => { handleSubmitForm({ values }); };

	useImperativeHandle(ref, () => ({
		formSubmit() {
			handleSubmit(onSubmit)();
		},
	}));
	return (
		<div>
			<Layout control={control} errors={errors} controls={controls} />
		</div>

	);
}

export default forwardRef(EditForm);
