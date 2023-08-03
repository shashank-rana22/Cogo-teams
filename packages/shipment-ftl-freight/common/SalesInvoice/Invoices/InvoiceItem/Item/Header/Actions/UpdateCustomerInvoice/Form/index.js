import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/surface-modules';
import { useEffect, forwardRef, useImperativeHandle } from 'react';

import { companyToIdMap } from '../../commons/utils/companyIdMapper';

function Form({ defaultValues, finalControls }, ref) {
	const {
		control,
		formState: { errors },
		handleSubmit,
		watch,
		setValue,
		reset,
	} = useForm({ defaultValues });

	useEffect(() => {
		reset(defaultValues);
	}, [defaultValues, reset]);

	const watchCustomerName = watch('customer_name');

	useEffect(() => {
		setValue('customer_id', companyToIdMap[watchCustomerName]);
	}, [watchCustomerName, setValue]);

	useImperativeHandle(ref, () => ({ handleSubmit }), [handleSubmit]);

	return (
		<Layout
			control={control}
			fields={finalControls}
			errors={errors}
			customValues={defaultValues}
		/>
	);
}

export default forwardRef(Form);
