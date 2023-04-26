import React, { useState } from 'react';

import BUCKET_MAPPING from '../../config/BUCKET_MAPPING.json';
import useListAuthorityDeskBlDocuments from '../../hooks/useListAuthorityDeskBlDocuments';

import Filters from './Filters';
import List from './List';
import styles from './styles.module.css';

function Ocean() {
	const { buckets } = BUCKET_MAPPING;
	const [filters, setFilters] = useState({});
	const [bucket, setBucket] = useState('eligible');

	const { data, loading } = useListAuthorityDeskBlDocuments();

	const stateProps = { bucket, setBucket, filters, setFilters };

	return (
		<div className={styles.container}>
			<div className={styles.heading}> Authority Desk</div>

			<div className={styles.list_filters}>
				<div className={styles.buckets}>
					{ buckets.map((item) => (
						<div role="button" tabIndex={0} className={styles.bucket} onClick={() => setBucket(item?.name)}>
							{item.title}
						</div>
					))}
				</div>

				<Filters stateProps={stateProps} />
			</div>

			<List data={data} loading={loading} stateProps={stateProps} />

		</div>

	);
}

export default Ocean;
