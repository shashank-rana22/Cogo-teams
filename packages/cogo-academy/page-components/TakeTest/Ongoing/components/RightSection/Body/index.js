import { isEmpty } from '@cogoport/utils';

import QuestionsCount from './QuestionsCount';
import QuestionStats from './QuestionStats';
import styles from './styles.module.css';

function Body({ data = [], loading }) {
	if (loading || isEmpty(data)) {
		return null;
	}
	return (
		<div className={styles.container}>
			<QuestionStats data={data} />

			<QuestionsCount data={data} loading={loading} />
		</div>
	);
}

export default Body;
