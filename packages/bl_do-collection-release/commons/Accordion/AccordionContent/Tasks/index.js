// import Layout from '@cogo/bookings/commons/Layout';
import { useForm } from '@cogoport/forms';
import React, { useEffect, useImperativeHandle, forwardRef } from 'react';

const getDefaultValues = (controls) => {
	const defaultVlaues = {};
	(controls || []).forEach((item) => {
		defaultVlaues[item.name] = '';
	});
	return defaultVlaues;
};

function CustomTasks({ setMyForm = () => {}, controls }, ref) {
	console.log('defaaaa', getDefaultValues(controls), controls);
	const {
		fields,
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
		[],
	);

	// return <Layout fields={fields} controls={controls} errors={errors} />;
	return <div>AccordianTimeline</div>;
}

export default forwardRef(CustomTasks);
