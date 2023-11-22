import { cl } from '@cogoport/components';
import React from 'react';

import Loader from '../../../../../common/Loader';
import makeShortName from '../../../../../common/MakeShortName';

import styles from './styles.module.css';

function OrgData({ manager_detail = '', hrbp_detail = '', loading = false }) {
	if (loading) {
		return (
			<div className={styles.container}>
				<Loader height="20px" count={3} />
			</div>
		);
	}
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Have a concern? Reach out to 📢
			</div>
			<div className={styles.summary}>
				<div className={cl`${styles.avg_data} ${styles.mr_30}`}>
					{
						manager_detail?.passport_size_photo_url
							? (
								<img
									className={styles.name_avatar_photo}
									src={manager_detail?.passport_size_photo_url}
									alt="profile"
								/>
							)
							: (
								<div className={cl`${styles.name_avatar_photo} ${styles.name_avatar}`}>
									{makeShortName(manager_detail?.name)}
								</div>
							)
					}

					<div>
						<div className={styles.avg_summary}>
							{manager_detail?.name}
						</div>
						Manager
					</div>
				</div>
				<div className={styles.avg_data}>
					{
						hrbp_detail?.passport_size_photo_url
							? (
								<img
									className={styles.name_avatar_photo}
									src={hrbp_detail?.passport_size_photo_url}
									alt="profile"
								/>
							)
							: (
								<div className={cl`${styles.name_avatar_photo} ${styles.name_avatar}`}>
									{makeShortName(hrbp_detail?.name)}
								</div>
							)
					}

					<div>
						<div className={styles.avg_summary}>
							{hrbp_detail?.name}
						</div>
						HRBP
					</div>
				</div>
			</div>
		</div>
	);
}

export default OrgData;
