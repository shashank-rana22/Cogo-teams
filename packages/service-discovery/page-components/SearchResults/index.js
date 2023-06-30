import { Loader } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useEffect, useState, useMemo } from 'react';

import EditDetailsHeader from './components/EditDetailsHeader';
import Filters from './components/Filters';
import Header from './components/Header';
import useGetSpotSearch from './hooks/useGetSpotSearch';
import styles from './styles.module.css';

function SearchResults() {
	const [showAdditionalHeader, setShowAdditionalHeader] = useState(false);
	const [showFilterModal, setShowFilterModal] = useState(false);
	const [headerProps, setHeaderProps] = useState({});
	const [pageLoading, setPageLoading] = useState(false);

	const router = useRouter();

	const { spot_search_id, importer_exporter_id } = router.query;

	const { refetchSearch, loading, data } = useGetSpotSearch();

	const SUB_HEADER_COMPONENT_MAPPING = useMemo(() => ({
		edit_details: EditDetailsHeader,
	}), []);

	// useEffect(() => {
	// 	const handleStart = () => setPageLoading(true);
	// 	const handleComplete = () => setPageLoading(false);

	// 	router.events.on('routeChangeStart', handleStart);
	// 	router.events.on('routeChangeComplete', handleComplete);
	// 	router.events.on('routeChangeError', handleComplete);

	// 	return () => {
	// 		router.events.off('routeChangeStart', handleStart);
	// 		router.events.off('routeChangeComplete', handleComplete);
	// 		router.events.off('routeChangeError', handleComplete);
	// 	};
	// }, [router]);

	useEffect(() => {
		refetchSearch({ spot_search_id, importer_exporter_id });
	}, [spot_search_id]);

	if (pageLoading || loading) {
		return (
			<div className={styles.loading}>
				<span className={styles.loading_text}>Looking for Rates</span>
				<Loader themeType="primary" className={styles.loader} background="#000" />
			</div>
		);
	}

	const Component = SUB_HEADER_COMPONENT_MAPPING[headerProps?.key] || null;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Header
					data={data?.detail}
					showAdditionalHeader={showAdditionalHeader}
					setShowAdditionalHeader={setShowAdditionalHeader}
					setHeaderProps={setHeaderProps}
					setShowFilterModal={setShowFilterModal}
				/>

				{showAdditionalHeader ? (
					<Component {...headerProps} />
				) : null}
			</div>

			{showFilterModal ? (
				<Filters
					data={data?.detail}
					show={showFilterModal}
					setShow={setShowFilterModal}
				/>
			) : null}
		</div>
	);
}

export default SearchResults;
