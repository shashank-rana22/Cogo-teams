/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';

import { redFlagsData } from '../../../../configurations/dummyRedfagsData';
import LoaderRedFlags from '../LoaderRedFlags';

import styles from './styles.module.css';

function RedFlags({ loading = false }) {
	return (
	// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			<div className={styles.redflags_container}>
				<div className={styles.heading}>Escalations</div>

				{
					loading ? <LoaderRedFlags />
						: (
							<div className={styles.redflags_lists}>
								{redFlagsData.map((item) => {
          	            const { picture, name, notification_nos } = item;
          	            return (

	                <div className={styles.escalations_list}>
		                <div className={styles.picture_name_kam_box}>
			                <div className={styles.picture}>{picture}</div>
			                <div className={styles.name}>{name}</div>
			                <div className={styles.kam}>kam</div>
		                </div>
		                <div className={styles.notification_nos}>{notification_nos}</div>
	                </div>
          	                );
								})}
							</div>
						)
				}
			</div>
		</>
	);
}

export default RedFlags;
