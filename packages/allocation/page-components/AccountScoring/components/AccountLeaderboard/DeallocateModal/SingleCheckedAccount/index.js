import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import React from 'react';

import SINGLE_ACCOUNT_STATS from '../../../../constants/get-single-account-stats';

import styles from './styles.module.css';

function SingleCheckedAccount({ modalDetailsArray = [] }) {
	return (
		<div className={styles.single_container}>
			<div className={styles.heading}>
				You are about to
				<strong> de-allocate </strong>
				&quot;
				{startCase(modalDetailsArray[GLOBAL_CONSTANTS.zeroth_index].business_name || '')}
				&quot;.
				Please verify from the list below before de-allocation

			</div>

			<div className={styles.details_card}>

				{SINGLE_ACCOUNT_STATS.map((detailsObject) => {
					const { detail_label, stats, detail_key } = detailsObject;
					return (
						<>
							<div key={detail_key} className={styles.detail_label}>{detail_label}</div>
							<div className={styles.single_card} key={detail_key}>
								{stats?.map((item) => {
									const { key, label, flex } = item;

									return (
										<div key={key} style={{ flex }}>

											<div className={styles.label}>
												{' '}
												{label}
												{' '}
											</div>

											<div className={styles.value}>
												{modalDetailsArray[GLOBAL_CONSTANTS.zeroth_index]?.[key] || ''}

											</div>

										</div>
									);
								})}
							</div>
						</>

					);
				})}

			</div>

		</div>
	);
}

export default SingleCheckedAccount;
