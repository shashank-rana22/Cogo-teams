import { Pill, Button } from '@cogoport/components';
import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import { useState } from 'react';

import AudienceList from './AudienceList';
import styles from './styles.module.css';
import ViewCards from './ViewCards';
import ViewCardsList from './ViewCardsList';

function AllUsers(props) {
	const {
		active_audiences = [],
		most_viewed_questions = [],
		popular_questions = [],
		question_stats = '',
		trending_topics,
	} = props;
	const {
		no_of_likes = '',
		no_of_dislikes = '',
		no_of_views = '',
		answers_requested = '',
		no_of_searches = '',
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
						All Users

					</Pill>

					<Pill
						size="lg"
						color="#F3FAFA"
						style={{
							fontWeight : '600',
							marginTop  : '-9%',
							marginLeft : '30%',

						}}
					>
						No of Searches:
						{' '}
						{no_of_searches}

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
						{no_of_views}

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
					<Pill
						size="lg"
						color="#F3FAFA"
						style={{
							fontWeight : '600',
							marginTop  : '-9%',
							marginLeft : '1%',

						}}
					>
						Answers Requested:
						{' '}
						{answers_requested}

					</Pill>

				</div>
				<div style={{ display: 'flex' }}>
					<div style={{ display: 'flex' }}>

						<ViewCards
							cardHeading="User group that viewed the Most Questions "
							subHeading={active_audiences}
						/>
						<ViewCards
							cardHeading="Topic from which Most Questions viewed"
							subHeading={trending_topics}
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
					</div>
				</div>
				<div style={{ marginTop: '-25px', marginRight: '-10px', float: 'right' }}>
					<Button size="md" themeType="tertiary" onClick={() => setShowQuestions((pv) => !pv)}>
						<div style={{ fontWeight: 600 }}>All Users..</div>
						{!showQuestions ? <IcMArrowDown /> : <IcMArrowUp />}
					</Button>
				</div>
			</div>
			{showQuestions ? <AudienceList props={active_audiences} /> : null}
		</div>

	);
}

export default AllUsers;
