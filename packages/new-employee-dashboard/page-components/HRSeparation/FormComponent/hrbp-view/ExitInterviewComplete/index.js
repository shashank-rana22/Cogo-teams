// import useGetGenerateExitCode from '../../hooks/useGetGenerateExitCode';
import ExitHeading from '../ExitInterview/ExitHeading';

import InterviewComplete from './InterviewCompletion';
// import styles from './styles.module.css';

function ExitInterviewComplete({ data = {} }) {
	// const { exit_interview } = data || {};
	// const { exit_interview :exit_interview_scheduled } = exit_interview || {};
	// //const { sub_process_detail_id, sub_process_data } = exit_interview_scheduled || {};

	// const { getExitCode } = useGetGenerateExitCode();

	const onSubmit = () => {
		console.log('submitted');
		// updateApplication({
		// 	payload,
		// });
		// reset();
	};
	return (
		<>
			<ExitHeading title="EXIT INTERVIEW" subTitle="Schedule interview the the employee" />
			<InterviewComplete onSubmit={onSubmit} data={data} />

			{/* <div className={styles.footer}>
				<Button themeType="secondary" style={{ marginRight: '12px' }}>Back</Button>
				<Button themeType="primary" onClick={() => handleSubmit(onSubmit)()}>
					Notify Employee
					<IcMArrowRight width={16} height={16} style={{ marginLeft: '12px' }} />
				</Button>
			</div> */}
		</>

	);
}

export default ExitInterviewComplete;
