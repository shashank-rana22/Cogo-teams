import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import DetentionDemurrage from '../../D&D';
import Filters from '../../Filters';

import Reset from './Reset';
import styles from './styles.module.css';

function NoRatesFound({
	details = {},
	filters = {},
	setFilters = () => {},
	refetch = () => {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.left_section}>
				<img
					src={GLOBAL_CONSTANTS.image_url.no_rates_found_emoji}
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
				<DetentionDemurrage
					details={details}
					refetch={refetch}
				/>

				<Filters
					setFilters={setFilters}
					data={details}
					filters={filters}
				/>

				<Reset setFilters={setFilters} />
			</div>
		</div>
	);
}

export default NoRatesFound;
