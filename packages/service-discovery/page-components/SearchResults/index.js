import { useRouter } from '@cogoport/next';
import React, { useEffect } from 'react';

import Header from './components/Header';
import useGetSpotSearch from './hooks/useGetSpotSearch';
import styles from './styles.module.css';

function SearchResults() {
	const { query } = useRouter();

	const { spot_search_id, importer_exporter_id } = query;

	const { refetchSearch, loading, data } = useGetSpotSearch();

	useEffect(() => {
		refetchSearch({ spot_search_id, importer_exporter_id });
	}, []);

	if (loading) {
		return (
			<div className={styles.loading}>
				<span className={styles.loading_text}>Looking for Rates</span>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}><Header data={data?.detail} /></div>
		</div>
	);
}

export default SearchResults;
