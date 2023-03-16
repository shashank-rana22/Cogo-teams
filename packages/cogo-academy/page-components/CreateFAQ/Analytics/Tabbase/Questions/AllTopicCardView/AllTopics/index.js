import { Pill, Button, Tooltip } from '@cogoport/components';
import { IcMArrowDown, IcMArrowUp, IcMArrowDoubleRight } from '@cogoport/icons-react';
import { useState, forwardRef } from 'react';

import QuestionsList from './QuestionList';
import Scroll from './Scroll';
import styles from './styles.module.css';
import ViewCards from './ViewCards';
import ViewCardsList from './ViewCardsList';

const scrollHorizontal = (scrollOffset, ref) => {
	const tableRootElement = ref.current.querySelector('.ui-table-root');
	tableRootElement.scrollLeft += scrollOffset;
};

function AllTopic({ props = '' }) {
	const {
		active_audiences = [],
		most_viewed_questions = [],
		popular_questions,
		question_stats = '',
		topic_wise_questions,
		trending_tags,
		trending_topics,
		unpopular_questions,
	} = props;
	const {
		name = '',
		question_count = 0,
		view_count = 0,
		faq_questions = [],

	} = props;
	const truncate = (str) => (str?.length > 30 ? `${str.substring(0, 28)}...` : str);

	const {
		no_of_questions = '',
		no_of_likes = '',
		no_of_dislikes = '',
		no_of_views = '',
	} = question_stats;

	const [showQuestions, setShowQuestions] = useState(false);
	return (
		<div style={{ marginTop: '1rem', overflow: 'hidden' }}>
			<div className={styles.container}>
				<div style={{ justifyContent: 'space-between' }}>
					<Pill
						size="xl"
						color="#CFEAED"
						style={{
							fontWeight : '600',
							marginTop  : '-9%',
							marginLeft : '1%',

						}}
					>
						<Tooltip content={name} placement="right">
							<div>
								{truncate(name)}
							</div>
						</Tooltip>

					</Pill>

					<Pill
						size="lg"
						color="#F3FAFA"
						style={{
							fontWeight : '600',
							marginTop  : '-9%',
							marginLeft : '45%',

						}}
					>
						No of Questions:
						{' '}
						{question_count}

					</Pill>
					<Pill
						size="lg"
						color="#F3FAFA"
						style={{
							fontWeight : '600',
							marginTop  : '-9%',
							marginLeft : '1%',

						}}
					>
						No of Views:
						{' '}
						{view_count}

					</Pill>
					<Pill
						size="lg"
						color="#F3FAFA"
						style={{
							fontWeight : '600',
							marginTop  : '-9%',
							marginLeft : '1%',

						}}
					>
						No of Likes:
						{' '}
						{no_of_likes}

					</Pill>
					<Pill
						size="lg"
						color="#F3FAFA"
						style={{
							fontWeight : '600',
							marginTop  : '-9%',
							marginLeft : '1%',

						}}
					>
						No of Dislikes:
						{' '}
						{no_of_dislikes}

					</Pill>

				</div>
				<div style={{ display: 'flex' }}>
					<div style={{ display: 'flex' }}>
						<ViewCards
							cardHeading="User group that viewed the Most Questions "
							subHeading={active_audiences}
						/>
						<ViewCardsList
							cardHeading="Top Viewed Questions"
							contentQuestion={most_viewed_questions}
						/>
						<ViewCardsList cardHeading="Top Liked Questions" contentQuestion={most_viewed_questions} />
						<ViewCardsList cardHeading="Top Disliked Questions" contentQuestion={most_viewed_questions} />
					</div>
				</div>
				<div style={{ marginTop: '-25px', marginRight: '-10px', float: 'right' }}>
					<Button size="md" themeType="tertiary" onClick={() => setShowQuestions((pv) => !pv)}>
						<div style={{ fontWeight: 600 }}>All Questions..</div>
						{!showQuestions ? <IcMArrowDown /> : <IcMArrowUp />}
					</Button>
				</div>
			</div>
			{showQuestions ? <QuestionsList props={faq_questions} /> : null}
		</div>

	);
}

export default AllTopic;
