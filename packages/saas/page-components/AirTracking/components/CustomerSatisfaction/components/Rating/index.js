import { RatingComponent } from '@cogoport/components';

import styles from './styles.module.css';

const DEFAULT_RATING = 3;

function Rating({ setFeedback = () => {}, feedback = {} }) {
	const { rating = DEFAULT_RATING } = feedback || {};

	return (
		<div className={styles.stars_container}>
			<RatingComponent
				type="star"
				size="xl"
				totalStars={5}
				value={rating}
				onChange={(e) => {
					setFeedback({
						rating          : e,
						selectedOptions : [],
						reason          : '',
					});
				}}
			/>
		</div>
	);
}

export default Rating;
