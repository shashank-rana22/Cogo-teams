import { IcMArrowBack } from '@cogoport/icons-react';

import QuestionsAndDistribution from './components/QuestionsAndDistribution';
import styles from './styles.module.css';

function ReviewAndCriteria() {
	return (
		<div>
			<div className={styles.header}>
				<IcMArrowBack width={20} height={20} />
				<div className={styles.title}>Review and Set Criteria</div>
			</div>
			<QuestionsAndDistribution />
		</div>
	);
}

export default ReviewAndCriteria;
