import { Pill, Button } from '@cogoport/components';
import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import { useState } from 'react';

import AnalyticsLoader from '../../../../../../commons/AnalyticsLoader';

import QuestionsList from './QuestionList';
import Scroll from './Scroll';
import styles from './styles.module.css';
import ViewCards from './ViewCards';
import ViewCardsList from './ViewCardsList';

// const scrollHorizontal = (scrollOffset, ref) => {
// 	const tableRootElement = ref.current.querySelector('.ui-table-root');
// 	tableRootElement.scrollLeft += scrollOffset;
// };

function AllQuestionCardView({ props = {} }) {
	const {
		active_audiences = [],
		most_viewed_questions = [],
		popular_questions = [],
		question_stats = '',
		trending_topics,
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
		<div>
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

					<div style={{ display: 'flex' }}>
						<ViewCards
							cardHeading="Topic from which Most Questions viewed"
							subHeading={trending_topics}

						/>
						<ViewCards
							cardHeading="User group that viewed the Most Questions "
							subHeading={active_audiences}
						/>
						<ViewCardsList
							state="Viewed_Question"
							cardHeading="Top Viewed Questions"
							contentQuestion={most_viewed_questions}
						/>
						<ViewCardsList
							state="Liked_Question"
							cardHeading="Top Liked Questions"
							contentQuestion={popular_questions}
						/>
						<Scroll />
						{/* <ViewCards cardHeading="Topic from which Most Questions viewed" subHeading="ed" /> */}
						{/* <ViewCards cardHeading="User group that viewed the Most Questions " subHeading="ecd" /> */}
						{/* <ViewCardsList
							cardHeading="Top Viewed Questions"
							contentQuestion="What are Incoterms?"
						/>
						<ViewCardsList
							cardHeading="Top Liked Questions"
							contentQuestion="What are Incoterms?"
						/> */}
					</div>

					<div className={styles.button_container}>
						<Button size="md" themeType="tertiary" onClick={() => setShowQuestions((pv) => !pv)}>
							ALL QUESTIONS
							{!showQuestions
								? <IcMArrowDown style={{ marginLeft: 4 }} />
								: <IcMArrowUp style={{ marginLeft: 4, marginBottom: 2 }} />}
						</Button>
					</div>
				</div>

				{showQuestions ? <QuestionsList /> : null}
			</div>

		</div>

	);
}

export default AllQuestionCardView;
