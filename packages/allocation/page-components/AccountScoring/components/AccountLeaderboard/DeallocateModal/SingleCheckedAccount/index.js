import { startCase } from '@cogoport/utils';
import React from 'react';

import SINGLE_ACCOUNT_STATS from '../../../../constants/get-single-account-stats';

import styles from './styles.module.css';

const DEFAULT_FIRST_ELEMENT = 0;

function SingleCheckedAccount({ modalDetailsArray = [] }) {
	return (
		<div className={styles.single_container}>
			<div className={styles.heading}>
				You are about to
				<strong> de-allocate </strong>
				&quot;
				{startCase(modalDetailsArray[DEFAULT_FIRST_ELEMENT].business_name)}
				&quot;.
				Please verify from the list below before de-allocation

			</div>

			<div className={styles.details_card}>

				{SINGLE_ACCOUNT_STATS.map((detailsObject) => {
					const { detail_label, stats, detail_key } = detailsObject;
					return (
						<>
							<div className={styles.detail_label}>{detail_label}</div>
							<div className={styles.single_card} key={detail_key}>
								{stats?.map((item) => {
									const { key, label, flex } = item;

									return (
										<div key={key} style={{ flex }}>

											{label ? (
												<div className={styles.label}>
													{' '}
													{label}
													{' '}
												</div>
											) : null}

											<div className={styles.value}>
												{modalDetailsArray[DEFAULT_FIRST_ELEMENT][key]}

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
