import { RatingComponent } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function RelatedProductCard({
	relatedTopics,
	starRating,
	setStarRating,
}) {
	return (
		relatedTopics.map((item) => (
			<div className={styles.list_card} key={item.id}>
				<div className={styles.img_section}>
					<img src="" alt="text" />
				</div>
				<div className={styles.text_section}>
					<div className={styles.grey}><span>BRAND / TYPE</span></div>
					<div className={styles.black}>
						<span>{item.name}</span>
					</div>
					<div className={styles.price_section}>
						<span className={styles.cost_real}>{item.discounted_price}</span>
						<span className={styles.cost_shown}>
							{item.price}
						</span>
					</div>
					<div className={styles.stars}>
						<RatingComponent
							type="star"
							totalStars={5}
							value={starRating}
							size="xs"
							onChange={setStarRating}
						/>
						<span style={{ marginLeft: '8px' }}>(45)</span>
					</div>
				</div>
			</div>
		))
	);
}

export default RelatedProductCard;
