import React from 'react';
import { Skeleton } from '@cogoport/components';
import styles from './styles.module.css';
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const Loader = () => {
	return (
		<div className={styles.container}>
			{array.map((item) =>
				item === 5 || item === 9 ? (
					<div className={styles.seperator_container}>
						<Skeleton className="circle" width="40px" height="25px" />
					</div>
				) : (
					<div className={styles.sub_container}>
						<div className={styles.icon_container}>
							<Skeleton className="circle" width="20px" height="15px" />
						</div>

						<div className={styles.details_container}>
							<Skeleton width="100%" height="20px" />
							<Skeleton width="100%" height="20px" />
						</div>
					</div>
				),
			)}
		</div>
	);
};

export default Loader;
