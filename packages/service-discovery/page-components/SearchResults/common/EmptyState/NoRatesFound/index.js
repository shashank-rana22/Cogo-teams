import React from 'react';

import Filters from '../../Filters';

import styles from './styles.module.css';

function NoRatesFound({ details = {}, filters = {}, setFilters = () => {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.left_section}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image_216.svg"
					alt="no-rates-found"
					height={72}
					className={styles.icon}
				/>

				<div className={styles.text_container}>
					<p className={styles.big_text}>Sorry! No rates found</p>

					<p className={styles.small_text}>
						Oops, this is unusual and we are working on finding rates for this route.
						Meanwhile, please try the alternate routes.
					</p>
				</div>
			</div>

			<div className={styles.right_section}>
				<Filters
					data={details}
					filters={filters}
					setFilters={setFilters}
				/>
			</div>
		</div>
	);
}

export default NoRatesFound;
