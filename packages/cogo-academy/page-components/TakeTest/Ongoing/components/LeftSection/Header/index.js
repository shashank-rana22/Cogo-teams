import { ProgressBar } from '@cogoport/components';

import useFetchTest from '../../../../Introduction/hooks/useFetchTest';

import styles from './styles.module.css';
import Timer from './Timer';

function Header({ datas = {}, total_question }) {
	const { data = {} } = useFetchTest();

	console.log('data', data);
	const currQuestion = datas?.data?.findIndex((item) => item?.answer_state === 'not_viewed');
	const number = currQuestion > 0 ? currQuestion : datas?.data?.length;
	return (
		<div className={styles.main_container}>
			<div className={styles.heading}>{data?.name}</div>
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
