import { Placeholder } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useRef } from 'react';

import Banner from './Banner';
import CaseStudy from './CaseStudy';
import StandAlone from './StandAlone';
import styles from './styles.module.css';
import Subjective from './Subjective';

const INCREMENTAL_ELEMENT = 1;

function QnA({ user_name = '', test_id, user_id, view, is_evaluated = false, status, activeAttempt }) {
	const ref = useRef();

	const scrollToSubjective = () => {
		ref.current.scrollIntoView({ behavior: 'smooth' });
	};

	const [{ data, loading }] = useRequest({
		method : 'GET',
		url    : '/get_questions_analysis',
		params : {
			user_id,
			test_id,
			active_questions_required: activeAttempt === 'attempt1',
		},
	}, { manual: false });

	const { stand_alone_questions = [], case_study_questions = [], subjective_questions = [] } = data || {};

	if (loading) {
		return (
			<Placeholder height="280px" width="100%" margin="40px 0px 20px 0px" borderRadius="6px" />
		);
	}

	if (isEmpty(stand_alone_questions) && isEmpty(case_study_questions) && isEmpty(subjective_questions)) {
		return (
			<div className={styles.empty_state}>Nothing To Show Here</div>
		);
	}

	const showBanner = view === 'admin' && !isEmpty(subjective_questions) && !is_evaluated;

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Questions wise analysis
			</div>

			{showBanner ? (
				<Banner scrollToSubjective={scrollToSubjective} />
			) : null}

			<div className={styles.question_cards_container}>
				{!isEmpty(stand_alone_questions) ? (
					<StandAlone questions={stand_alone_questions} user_name={user_name} />
				) : null}

				{!isEmpty(case_study_questions) ? (
					case_study_questions.map((item, index) => (
						<CaseStudy
							key={item?.questions_description?.id}
							case_study={item}
							index={index}
							user_name={user_name}
							question_index={stand_alone_questions.length + index + INCREMENTAL_ELEMENT}
						/>
					))
				) : null}

				{!isEmpty(subjective_questions) ? (
					<div ref={ref}>
						<Subjective
							questions={subjective_questions}
							user_id={user_id}
							test_id={test_id}
							count_till_now={stand_alone_questions.length + case_study_questions.length}
							view={view}
							status={status}
							activeAttempt={activeAttempt}
						/>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default QnA;
