import { Pill, Button, Tooltip } from '@cogoport/components';
import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import QuestionsList from './QuestionList';
import styles from './styles.module.css';
import ViewCards from './ViewCards';
import ViewCardsList from './ViewCardsList';

function AllTopic(props) {
	const {
		current_topic_data = [],
		display_name = '',
		question_count = 0,
		view_count = 0,
		id = '',
	} = props;

	const {
		most_disliked_questions = [],
		most_liked_questions = [],
		most_viewed_questions = [],
		topic_stats = [],
		topic_wise_audiences = [],

	} = current_topic_data;
	const { total_likes = 0, total_dislikes = 0 } = topic_stats || {};

	const [showQuestions, setShowQuestions] = useState(false);
	const truncate = (str) => (str?.length > 40 ? `${str.substring(0, 38)}...` : str);

	const PILL_MAPPING = {
		'No of Questions' : question_count,
		'No of Views'     : view_count,
		'No of Likes'     : total_likes,
		'No of Dislikes'  : total_dislikes,
	};

	return (
		<div style={{ marginTop: '1rem', overflow: 'hidden' }}>
			<div className={styles.container}>
				<div className={styles.pill_container}>
					<Pill
						size="xl"
						color="#CFEAED"
						style={{ fontWeight: '600', height: 'fit-content' }}
					>
						<Tooltip content={display_name} placement="right">
							<div>
								{truncate(startCase(display_name))}
							</div>
						</Tooltip>
					</Pill>

					<div className={styles.info_pills}>
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

				<div style={{ display: 'flex' }}>
					<ViewCards
						cardHeading="User group that viewed the Most Questions "
						subHeading={topic_wise_audiences}
					/>

					<ViewCardsList
						state="viewed_question"
						cardHeading="Top Viewed Questions"
						contentQuestion={most_viewed_questions}
					/>

					<ViewCardsList
						state="liked_question"
						cardHeading="Top Liked Questions"
						contentQuestion={most_liked_questions}
					/>

					<ViewCardsList
						state="disliked_question"
						cardHeading="Top Disliked Questions"
						contentQuestion={most_disliked_questions}
					/>
				</div>

				<div className={styles.button_container}>
					<Button size="md" themeType="tertiary" onClick={() => setShowQuestions((pv) => !pv)}>
						ALL QUESTIONS
						{!showQuestions
							? <IcMArrowDown style={{ marginLeft: 4, marginBottom: 2 }} />
							: <IcMArrowUp style={{ marginLeft: 4, marginBottom: 2 }} />}
					</Button>
				</div>
			</div>

			{showQuestions ? <div className={styles.dropdown}><QuestionsList id={id} /></div> : null}
		</div>

	);
}

export default AllTopic;
