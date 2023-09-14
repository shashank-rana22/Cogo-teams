// import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useState } from 'react';

// import useGetGenerateExitCode from '../../hooks/useGetGenerateExitCode';
// import useUpdateAppliationProcessDetails from '../../hooks/useUpdateAppliationProcessDetails';
import ExitHeading from '../ExitInterview/ExitHeading';
import InterviewComplete from '../ExitInterviewComplete/InterviewCompletion';

import ReasonsToLeave from './Reasons';
// import styles from './styles.module.css';

function ExitReasons() {
	const [code, setCode] = useState(null);
	const [complete, setComplete] = useState(false);
	const {
	//	control,
		watch,
	//	reset,
		// handleSubmit,
	} = useForm();

	// const { exit_interview } = data || {};
	// const { exit_interview :exit_interview_scheduled } = exit_interview || {};
	// const { sub_process_detail_id, sub_process_data } = exit_interview_scheduled || {};
	// const OFF_BOARDING_APPLICATION_ID = '9e0f52c9-da4a-43fb-bd16-772cdc8f8bda';

	const v1 = watch();
	console.log('v1:', v1);
	//	const { updateApplication } = useUpdateAppliationProcessDetails({ refetch });
	// const { getExitCode } = useGetGenerateExitCode();

	// const onSubmit = (values) => {
	// 	console.log(values, 'formValues');
	// 	// const payload = {
	// 	// 	sub_process_data: values,
	// 	// 	// sub_process_detail_id : '50adeb65-d63c-4c99-9a16-cd724ee4ca35',
	// 	// 	// process_name          : 'admin_clearance',
	// 	// };
	// 	//	console.log(off_boarding_application_id);
	// 	getExitCode({ OFF_BOARDING_APPLICATION_ID });
	// 	// updateApplication({
	// 	// 	payload,
	// 	// });
	// 	reset();
	// };

	return (
		<>
			<ExitHeading title="EXIT INTERVIEW" subTitle="Schedule interview the the employee" />
			{!complete
				? <ReasonsToLeave setComplete={setComplete} setCode={setCode} /> : <InterviewComplete code={code} />}
		</>
	);
}

export default ExitReasons;
