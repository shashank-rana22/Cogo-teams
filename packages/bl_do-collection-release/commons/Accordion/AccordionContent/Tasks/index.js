import { useForm } from '@cogoport/forms';
import React, { useEffect, useImperativeHandle, forwardRef } from 'react';

import Layout from '../../../Layout';

const getDefaultValues = (controls) => {
	const defaultVlaues = {};
	(controls || []).forEach((item) => {
		defaultVlaues[item.name] = '';
	});
	return defaultVlaues;
};

function CustomTasks({ setMyForm = () => {}, controls }, ref) {
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
	}, [JSON.stringify(formValues)]);

	useImperativeHandle(
		ref,
		() => ({
			formTrigger: trigger,
		}),
		[trigger],
	);

	return <Layout fields={controls} control={control} errors={errors} />;
	// return <div>AccordianTimeline</div>;
}

export default forwardRef(CustomTasks);
