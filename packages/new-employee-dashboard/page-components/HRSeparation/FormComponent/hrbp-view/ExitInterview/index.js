// import { useForm } from '@cogoport/forms';
// import {
// 	IcCFtick,
// } from '@cogoport/icons-react';
// import React, { useState } from 'react';

import ExitHeading from './ExitHeading';
import InterviewComplete from './InterviewCompletion';
// import ReasonsToLeave from './Reasons';
// import ScheduleInterview from './Schedule';
// import styles from './styles.module.css';

function ExitInterview() {
	// const [visible, setvisible] = useState(false);
	// const {
	// 	control,
	// 	watch,
	// 	reset,
	// 	handleSubmit,
	// 	formState:{ errors = {} },
	// } = useForm();

	// const v1 = watch();
	// console.log('v1:', v1);

	// const onSubmit = (values) => {
	// 	console.log(values, 'formValues');
	// 	setvisible(true);
	// 	reset();
	// };
	return (
		<>
			<ExitHeading title="EXIT INTERVIEW" subTitle="Schedule interview the the employee" />
			{/* {
			visible
				? (
					<div className={styles.tickdiv}>
						<IcCFtick
							className={styles.tickicon}
						/>
						<span>Interview details are shared with the employee</span>
					</div>
				)
				: 			null
		} */}
			<InterviewComplete />

			{/* <ScheduleInterview visible={visible} control={control} watch={watch} reset={reset} errors={errors} />

			<div className={styles.footer}>
				<Button themeType="secondary" style={{ marginRight: '12px' }}>Back</Button>
				<Button themeType="primary" onClick={() => handleSubmit(onSubmit)()}>
					Notify Employee
					<IcMArrowRight width={16} height={16} style={{ marginLeft: '12px' }} />
				</Button>
			</div> */}
		</>

	);
}

export default ExitInterview;
