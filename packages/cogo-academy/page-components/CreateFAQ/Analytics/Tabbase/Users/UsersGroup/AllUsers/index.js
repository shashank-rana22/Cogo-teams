import { Pill, Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
// import { useState } from 'react';

import styles from './styles.module.css';
import ViewCards from './ViewCards';
import ViewCardsList from './ViewCardsList';

function AllUsers({ props = '' }) {
	const {
		name = '',
		current_audience_data = [],
	} = props;
	const {
		audience_wise_topics = [],
		most_disliked_questions = [],
		most_liked_questions = [],
		most_viewed_questions = [],
		audience_stats = [],
	} = current_audience_data;

	// const [showQuestions, setShowQuestions] = useState(false);

	const { total_questions = 0, total_views = 0, total_likes = 0, total_dislikes = 0 } = audience_stats || {};

	const truncate = (str) => (str?.length > 40 ? `${str.substring(0, 38)}...` : str);

	const PILL_MAPPING = {
		'No of Questions' : total_questions || 0,
		'No of Views'     : total_views || 0,
		'No of Likes'     : total_likes || 0,
		'No of Dislikes'  : total_dislikes || 0,
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
						<Tooltip content={name} placement="right">
							<div>
								{truncate(startCase(name))}
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
						cardHeading="Topics that viewed the Most Questions "
						subHeading={audience_wise_topics}
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

				{/* <div className={styles.button_container}>
					<Button size="md" themeType="tertiary" onClick={() => setShowQuestions((pv) => !pv)}>
						All Users
						{!showQuestions
							? <IcMArrowDown style={{ marginLeft: 4, marginBottom: 2 }} />
							: <IcMArrowUp style={{ marginLeft: 4, marginBottom: 2 }} />}
					</Button>
				</div>
			</div>

			{showQuestions ? <UsersQuestionList /> : null} */}
			</div>

		</div>

	);
}

export default AllUsers;
