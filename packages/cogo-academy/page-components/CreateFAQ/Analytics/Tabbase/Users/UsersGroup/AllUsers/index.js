import { Pill, Button, Tooltip } from '@cogoport/components';
import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';
import UsersQuestionList from './UsersQuestionList';
// import Scroll from './Scroll';
import ViewCards from './ViewCards';
import ViewCardsList from './ViewCardsList';

// const scrollHorizontal = (scrollOffset, ref) => {
// 	const tableRootElement = ref.current.querySelector('.ui-table-root');
// 	tableRootElement.scrollLeft += scrollOffset;
// };

function AllUsers({ props = '' }) {
	const {
		name = '',
		total_questions = 0,
		total_views = 0,
		most_viewed_questions = [],
		total_likes = 0,
		total_dislikes = 0,
		most_disliked_questions = [],
		most_liked_questions = [],
		topics = [],
	} = props;
	console.log('props', props);
	const [showQuestions, setShowQuestions] = useState(false);

	const truncate = (str) => (str?.length > 40 ? `${str.substring(0, 38)}...` : str);

	const PILL_MAPPING = {
		'No of Questions' : total_questions,
		'No of Views'     : total_views,
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
						subHeading={topics}
					/>

					<ViewCardsList
						state="Viewed_Question"
						cardHeading="Top Viewed Questions"
						contentQuestion={most_viewed_questions}
					/>

					<ViewCardsList
						state="Liked_Question"
						cardHeading="Top Liked Questions"
						contentQuestion={most_liked_questions}
					/>

					<ViewCardsList
						state="Disliked_Question"
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

			{showQuestions ? <UsersQuestionList props={most_liked_questions} /> : null}
		</div>

	);
}

export default AllUsers;
