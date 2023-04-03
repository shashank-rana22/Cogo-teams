import { Pill, Button } from '@cogoport/components';
import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import { useState } from 'react';

import AnalyticsLoader from '../../../../../../commons/AnalyticsLoader';

import QuestionsList from './QuestionList';
import Scroll from './Scroll';
import styles from './styles.module.css';

function AllQuestionCardView({ props = {} }) {
	const {
		question_stats = '',
		loading,
	} = props;
	const {
		no_of_questions = '',
		no_of_likes = '',
		no_of_dislikes = '',
		no_of_views = '',
	} = question_stats;

	const [showQuestions, setShowQuestions] = useState(false);

	const PILL_MAPPING = {
		'No of Questions' : no_of_questions,
		'No of Views'     : no_of_views,
		'No of Likes'     : no_of_likes,
		'No of Dislikes'  : no_of_dislikes,
	};

	if (loading) return <AnalyticsLoader />;

	return (
		<div style={{ marginTop: '12px' }}>
			<div className={styles.container}>
				<div className={styles.pills_container}>
					<Pill
						size="xl"
						color="#CFEAED"
						style={{ fontWeight: '600' }}
					>
						All Questions
					</Pill>

					<div>
						{Object.keys(PILL_MAPPING).map((key) => (
							<Pill
								key={key}
								size="lg"
								color="#F3FAFA"
								style={{ fontWeight: '600' }}
							>
								{key}
								:
								{' '}
								{PILL_MAPPING[key]}
							</Pill>
						))}
					</div>
				</div>

				<Scroll props={props} />

				<div className={styles.button_container}>
					<Button size="md" themeType="tertiary" onClick={() => setShowQuestions((pv) => !pv)}>
						ALL QUESTIONS
						{!showQuestions
							? <IcMArrowDown style={{ marginLeft: 4, marginBottom: 2 }} />
							: <IcMArrowUp style={{ marginLeft: 4, marginBottom: 2 }} />}
					</Button>
				</div>

			</div>

			{showQuestions ? <QuestionsList /> : null}
		</div>
	);
}

export default AllQuestionCardView;
