import React from 'react';

import styles from './styles.module.css';

function OfferBundle({ data }) {
	return (
		<div
			className={styles.container}
			style={{ background: data.bg_color, boxShadow: data.box_shadow, border: `1px solid ${data.bg_color}` }}
		>
			<span className={styles.tag}>TRANSPORT</span>

			<div className={styles.details_container}>
				<span className={styles.big_text}>{`Upto ${data.discount}% Off on total`}</span>

				<span className={styles.small_text}>Valid till 28 Feb. T&C Apply.</span>
			</div>

			<div className={styles.pills_container}>
				<span className={styles.pill}>Origin Transportation</span>
				<span className={styles.pill}>Origin Customs</span>
			</div>
		</div>
	);
}

export default OfferBundle;
