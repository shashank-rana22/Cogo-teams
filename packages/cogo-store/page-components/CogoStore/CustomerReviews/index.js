import { ProgressBar, RatingComponent } from '@cogoport/components';
import React, { useState } from 'react';

import { RATING_COUNT } from '../../../utils/constants';

import styles from './styles.module.css';

const RATING = 4;

function CustomerReviews() {
	const [starRating, setStarRating] = useState(RATING);
	return (
		<div className={styles.customer_review_section}>
			<div className={styles.left_container}>
				<div className={styles.left_top}>
					<span className={styles.left_header_text}>
						Customer Services
					</span>
					<div className={styles.stars}>
						<RatingComponent
							type="star"
							totalStars={5}
							value={starRating}
							size="md"
							onChange={setStarRating}
						/>
						<span className={styles.stars_text}>
							3.8 out of 5
						</span>
					</div>
					<div className={styles.global_rating_review}>
						13 Global Rating
					</div>
					<div className={styles.star_wise_count}>
						{(RATING_COUNT || []).map((item) => (
							<div className={styles.rating_mapping} key={item.starRating}>
								<span>{item.starRating}</span>
								<span className={styles.rating_meter}>
									<ProgressBar progress={item.progress} />
									{item.progress}
									%
								</span>
							</div>
						))}
					</div>
				</div>
				<div className={styles.left_bottom} />
			</div>
			<div className={styles.right_container}>
				Customer Username and Comment
			</div>
		</div>
	);
}

export default CustomerReviews;
