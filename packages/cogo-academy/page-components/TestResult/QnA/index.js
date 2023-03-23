import { Placeholder } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import QnAItem from './QnAItem/index.';
import styles from './styles.module.css';

function QnA() {
	const { profile: { user: { id: user_id } }, general: { query: { test_id } } } = useSelector((state) => state);

	const [{ data, loading }] = useRequest({
		method : 'GET',
		url    : '/get_questions_analysis',
		params : {
			user_id, test_id,
		},
	}, { manual: false });

	const { stand_alone_questions:standAlone, case_study_questions:caseStudy } = data || {};

	if (loading) {
		return (
			<Placeholder height="280px" width="100%" margin="40px 0px 20px 0px" borderRadius="6px" />
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Questions wise analysis
			</div>
			<div className={styles.question_cards_container}>
				{(standAlone || []).map((item, index) => (
					<div className={styles.question_card}>
						<QnAItem data={item} index={index} />
					</div>
				))}

			</div>
		</div>
	);
}

export default QnA;
