import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/ocean-modules';
import React, { useEffect, useImperativeHandle, forwardRef } from 'react';

const getDefaultValues = (controls) => {
	const defaultValues = {};
	(controls || []).forEach((item) => {
		defaultValues[item.name] = '';
	});
	return defaultValues;
};

function CustomTasks({ setMyForm = () => {}, controls = [] }, ref) {
	const {
		control,
		trigger,
		watch,
		formState: { errors },
	} = useForm(getDefaultValues(controls));

	const formValues = watch();

	useEffect(() => {
		setMyForm((prev) => ({
			...prev,
			...formValues,
		}));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(formValues)]);

	useImperativeHandle(
		ref,
		() => ({
			formTrigger: trigger,
		}),
		[trigger],
	);

	return <Layout fields={controls} control={control} errors={errors} />;
}

export default forwardRef(CustomTasks);
