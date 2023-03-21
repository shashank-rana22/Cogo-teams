import { ProgressBar } from '@cogoport/components';

import styles from './styles.module.css';
import Timer from './Timer';

function Header({ datas = {}, total_question, testData }) {
	const currQuestion = datas?.data?.findIndex((item) => item?.answer_state === 'not_viewed');

	const number = currQuestion > 0 ? currQuestion : datas?.data?.length;

	return (
		<div className={styles.main_container}>
			<div className={styles.heading}>{testData?.name}</div>

			<div className={styles.progress}>
				<ProgressBar progress={(number / total_question) * 100} uploadText=" " />
				{number}
				{' '}
				/
				{' '}
				{total_question}
			</div>
			<Timer />
		</div>

	);
}

export default Header;
