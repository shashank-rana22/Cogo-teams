import { ProgressBar } from '@cogoport/components';

import toFixed from '../../../../../CreateModule/utils/toFixed';

import styles from './styles.module.css';
import Timer from './Timer';

function Header({ total_question, testData,	setShowTimeOverModal, start_time, user_appearance = [] }) {
	const time = new Date(start_time).getTime();

	return (
		<div className={styles.main_container}>
			<div className={styles.heading}>{testData?.name}</div>

			<div className={styles.progress}>
				<ProgressBar progress={toFixed(((user_appearance.length / total_question) * 100), 2)} uploadText=" " />
				{user_appearance.length}
				/
				{total_question}
				{' '}
				Questions
			</div>

			<Timer
				test_start_time={time}
				duration={testData?.test_duration}
				setShowTimeOverModal={setShowTimeOverModal}
			/>
		</div>

	);
}

export default Header;
