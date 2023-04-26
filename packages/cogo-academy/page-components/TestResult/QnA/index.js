import { Placeholder } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import CaseStudy from './CaseStudy';
import QnAItem from './QnAItem';
import styles from './styles.module.css';

function QnA({ user_name = '', test_id, user_id }) {
	const [{ data, loading }] = useRequest({
		method : 'GET',
		url    : '/get_questions_analysis',
		params : {
			user_id, test_id,
		},
	}, { manual: false });

	const { stand_alone_questions = [], case_study_questions = [] } = data || {};

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
				{([...stand_alone_questions, ...case_study_questions] || []).map((item, index) => {
					if (!('questions' in item)) {
						return (
							<div className={styles.question_card}>
								<QnAItem data={item} index={index} user_name={user_name} />
							</div>
						);
					}

					return (
						<CaseStudy case_study={item} index={index} user_name={user_name} />
					);
				})}
			</div>
		</div>
	);
}

export default QnA;
