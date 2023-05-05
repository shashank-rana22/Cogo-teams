// import Layout from '@cogo/bookings/commons/Layout';
// import { useFormCogo } from '@cogoport/front/hooks';
import React, { useEffect, useImperativeHandle, forwardRef } from 'react';

function CustomTasks({ setMyForm = () => {}, controls }, ref) {
	const {
		fields,
		trigger,
		watch,
		formState: { errors },
	} = useFormCogo(controls);

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
