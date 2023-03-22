import { ProgressBar } from '@cogoport/components';

import styles from './styles.module.css';
import Timer from './Timer';

function Header({ data = {}, total_question, testData, startTiming }) {
	const currQuestion = data?.data?.findIndex((item) => item?.answer_state === 'not_viewed');

	const number = currQuestion > 0 ? currQuestion : data?.data?.length;
	return (
		<div className={styles.main_container}>
			<div className={styles.heading}>{testData?.name}</div>

			<div className={styles.progress}>
				<ProgressBar progress={((number / total_question) * 100).toFixed(2)} uploadText=" " />
				{number}
				{' '}
				/
				{' '}
				{total_question}
			</div>
			<Timer test_start_time={startTiming} duration={testData?.test_duration} />
		</div>

	);
}

export default Header;
