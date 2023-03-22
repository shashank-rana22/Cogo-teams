import { Carousel } from '@cogoport/components';

import ViewCards from '../ViewCards';
import ViewCardsList from '../ViewCardsList';

import styles from './styles.module.css';

function ScrollBar({ props = {} }) {
	const {
		active_audiences = [],
		most_viewed_questions = [],
		popular_questions = [],
		trending_topics = [],
		trending_tags = [],
		unpopular_questions = [],
		topic_wise_questions=[]
	} = props;
	const {topic_wise_disliked_questions=[],topic_wise_liked_questions=[]}=topic_wise_questions
console.log(topic_wise_liked_questions,'thy')
	const CAROUSELDATA = [
		{
			key    : 'item1',
			render : () => (
				<div className={styles.content}>
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
				</div>
			),
		},
		{
			key    : 'item2',
			render : () => (
				<div className={styles.content}>
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
					<ViewCards
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
						state="Viewed_Question"
						cardHeading="Top Viewed Questions"
						contentQuestion={most_viewed_questions}
					/>
					<ViewCardsList
						state="Liked_Question"
						cardHeading="Top Liked Questions"
						contentQuestion={popular_questions}
					/>
					<ViewCards
						cardHeading="Trending Tags"
						subHeading={trending_tags}
					/>
					<ViewCards
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
						state="Liked_Question"
						cardHeading="Top Liked Questions"
						contentQuestion={popular_questions}
					/>
					<ViewCards
						cardHeading="Trending Tags"
						subHeading={trending_tags}
					/>
					<ViewCards
						cardHeading="Topic from which Most
						Questions Disliked"
						subHeading={topic_wise_disliked_questions}
					/>
					<ViewCards
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
					<ViewCards
						cardHeading="Trending Tags"
						subHeading={trending_tags}
					/>
					<ViewCards
						cardHeading="Topic from which Most
						Questions Disliked"
						subHeading={topic_wise_disliked_questions}
					/>
					<ViewCards
						cardHeading="Topic from which Most
						Questions Liked"
						subHeading={topic_wise_liked_questions}
					/>
					<ViewCardsList
						state="Disliked_Question"
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
