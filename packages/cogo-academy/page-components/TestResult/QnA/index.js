import { Placeholder } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import CaseStudy from './CaseStudy';
import StandAlone from './StandAlone';
import styles from './styles.module.css';
import Subjective from './Subjective';

function QnA({ user_name = '', test_id, user_id, view }) {
	const [{ data, loading }] = useRequest({
		method : 'GET',
		url    : '/get_questions_analysis',
		params : {
			user_id, test_id,
		},
	}, { manual: false });

	const { stand_alone_questions = [], case_study_questions = [], subjective_questions = [] } = data || {};

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

				{!isEmpty(stand_alone_questions) ? (
					<StandAlone questions={stand_alone_questions} user_name={user_name} />
				) : null}

				{!isEmpty(case_study_questions) ? (
					case_study_questions.map((item, index) => (
						<CaseStudy
							case_study={item}
							index={index}
							user_name={user_name}
							question_index={stand_alone_questions.length + index + 1}
						/>
					))
				) : null}

				{!isEmpty(subjective_questions) ? (
					<Subjective
						questions={subjective_questions}
						user_id={user_id}
						test_id={test_id}
						count_till_now={stand_alone_questions.length + case_study_questions.length}
						view={view}
					/>
				) : null}

			</div>
		</div>
	);
}

export default QnA;
