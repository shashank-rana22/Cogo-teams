import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { forwardRef, useEffect, useImperativeHandle } from 'react';

import useCreateEntityMargin from '../../../../hooks/useCreateEntityMargin';
import useGetEntityMargin from '../../../../hooks/useGetEntityMargin';
import Layout from '../Layout';

import entityMarginControls from './controls';
import getShowElements from './getShowElements';

function CreateEntityMargin(
	{
		showModal = {},
		setShowModal = () => {},
		service = '',
	},
	ref,
) {
	const { entities = [] } = showModal || {};

	const { data = {}, loading = false } = useGetEntityMargin({ showModal, service });

	const {
		// fields,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
		control,
	} = useForm();
	// eslint-disable-next-line custom-eslint/variables-name-check
	const fields = {};
	entityMarginControls.forEach((ctrl) => {
		fields[ctrl.name] = ctrl;
	});

	const { createEntityMargin = () => {} } = useCreateEntityMargin({
		entities,
		service,
		setShowModal,
	});

	const formValues = watch();

	const validateInputs = ({ currSlab = [] }) => {
		let isValidate = true;
		currSlab.forEach((item) => {
			if (item?.upper_limit < item?.lower_limit) {
				Toast.error('Upper limit is lower than lower limit');
				isValidate = false;
			} else if (!item?.upper_limit || !item.limit_currency) {
				Toast.error('Fill all fields');
				isValidate = false;
			}
		});
		return isValidate;
	};

	const showElements = getShowElements({ formValues });

	useImperativeHandle(ref, () => ({ submitFun: handleSubmit(createEntityMargin) }));

	useEffect(() => {
		const defaultSlabValues = (data?.margin?.margin_slabs || []).map((singleSlab) => ({
			...singleSlab,
			limit_currency: singleSlab?.currency,
		}));
		setValue('margin_slabs', defaultSlabValues);
	}, [data?.margin?.margin_slabs, setValue]);

	return (
		<Layout
			controls={entityMarginControls}
			control={control}
			fields={fields}
			errors={errors}
			showElements={showElements}
			watch={watch}
			setValue={setValue}
			formValues={formValues}
			validateInputs={validateInputs}
			key={loading}
		/>
	);
}

export default forwardRef(CreateEntityMargin);
