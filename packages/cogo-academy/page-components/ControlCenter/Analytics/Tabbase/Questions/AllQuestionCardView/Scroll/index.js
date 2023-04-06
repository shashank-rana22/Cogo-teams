import { Carousel } from '@cogoport/components';

import ViewCards from '../ViewCards';
import ViewCardsList from '../ViewCardsList';
import ViewCardsTags from '../ViewCardsTags';

import styles from './styles.module.css';

function ScrollBar({ props = {} }) {
	const {
		active_audiences = [],
		most_viewed_questions = [],
		popular_questions = [],
		trending_topics = [],
		trending_tags = [],
		unpopular_questions = [],
		topic_wise_questions = {},
	} = props;
	const { topic_wise_disliked_questions = [], topic_wise_liked_questions = [] } = topic_wise_questions || {};

	const CAROUSELDATA = [
		{
			key    : 'item1',
			render : () => (
				<div className={styles.content}>
					<ViewCards
						state="viewed"
						cardHeading="Topic from which Most Questions viewed"
						subHeading={trending_topics}
					/>
					<ViewCards
						state="viewed"
						cardHeading="User group that viewed the Most Questions "
						subHeading={active_audiences}
					/>
					<ViewCardsList
						state="viewed_question"
						cardHeading="Top Viewed Questions"
						contentQuestion={most_viewed_questions}
					/>
					<ViewCardsList
						state="liked_question"
						cardHeading="Top Liked Questions"
						contentQuestion={popular_questions}
					/>
				</div>
			),
		},
		{
			key    : 'item2',
			render : () => (
				<div className={styles.content}>
					<ViewCards
						state="viewed"
						cardHeading="User group that viewed the Most Questions "
						subHeading={active_audiences}
					/>
					<ViewCardsList
						state="viewed_question"
						cardHeading="Top Viewed Questions"
						contentQuestion={most_viewed_questions}
					/>
					<ViewCardsList
						state="liked_question"
						cardHeading="Top Liked Questions"
						contentQuestion={popular_questions}
					/>
					<ViewCardsTags
						state="viewed"
						cardHeading="Trending Tags"
						subHeading={trending_tags}
					/>
				</div>
			),
		},
		{
			key    : 'item3',
			render : () => (
				<div className={styles.content}>
					<ViewCardsList
						state="viewed_question"
						cardHeading="Top Viewed Questions"
						contentQuestion={most_viewed_questions}
					/>
					<ViewCardsList
						state="liked_question"
						cardHeading="Top Liked Questions"
						contentQuestion={popular_questions}
					/>
					<ViewCardsTags
						cardHeading="Trending Tags"
						subHeading={trending_tags}
					/>
					<ViewCards
						state="disliked"
						cardHeading="Topic from which Most
						Questions Disliked"
						subHeading={topic_wise_disliked_questions}
					/>
				</div>
			),
		},
		{
			key    : 'item4',
			render : () => (
				<div className={styles.content}>
					<ViewCardsList
						state="liked_question"
						cardHeading="Top Liked Questions"
						contentQuestion={popular_questions}
					/>
					<ViewCardsTags
						cardHeading="Trending Tags"
						subHeading={trending_tags}
					/>
					<ViewCards
						state="disliked"
						cardHeading="Topic from which Most
						Questions Disliked"
						subHeading={topic_wise_disliked_questions}
					/>
					<ViewCardsTags
						state="liked"
						cardHeading="Topic from which Most
						Questions Liked"
						subHeading={topic_wise_liked_questions}
					/>
				</div>
			),
		},
		{
			key    : 'item5',
			render : () => (
				<div className={styles.content}>
					<ViewCardsTags
						cardHeading="Trending Tags"
						subHeading={trending_tags}
					/>
					<ViewCards
						state="disliked"
						cardHeading="Topic from which Most
						Questions Disliked"
						subHeading={topic_wise_disliked_questions}
					/>
					<ViewCardsTags
						state="liked"
						cardHeading="Topic from which Most
						Questions Liked"
						subHeading={topic_wise_liked_questions}
					/>
					<ViewCardsList
						state="disliked_question"
						cardHeading="Top Disliked Questions"
						contentQuestion={unpopular_questions}
					/>
				</div>
			),
		},

	];

	return (
		<Carousel
			size="lg"
			slides={CAROUSELDATA}
			showDots={false}
			showArrow
		/>
	);
}

export default ScrollBar;
