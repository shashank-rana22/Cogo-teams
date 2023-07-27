import { Loader, cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import Header from '../../common/Header';

import useGetSpotSearch from './hooks/useGetSpotSearch';
import FCLResults from './page-components/FCLResults';
import styles from './styles.module.css';

function SearchResults() {
	const [headerProps, setHeaderProps] = useState({});
	const [comparisonRates, setComparisonRates] = useState([]);
	const [selectedWeek, setSelectedWeek] = useState({});
	const [infoBanner, setInfoBanner] = useState({
		current      : 'edit_button',
		totalBanners : 2,
		buttonProps  : {
			edit_button: {
				buttons: [
					{
						label     : 'Close',
						themeType : 'link',
						type      : 'button',
						name      : 'close',
					},
					{
						label     : 'Next',
						themeType : 'accent',
						type      : 'button',
						name      : 'next',
						size      : 'sm',
					},
				],
				heading : 'Filter your preferences',
				content : `Want to add another container type? Or, 
				want to update the current one?`,
				subText         : 'Update it from here.',
				sequence_number : 1,
			},
			comparision_button: {
				buttons: [
					{
						label     : 'Close',
						themeType : 'link',
						type      : 'button',
						name      : 'close',
					},
					{
						label     : 'Prev',
						themeType : 'accent',
						type      : 'button',
						name      : 'prev',
						size      : 'sm',
					},
				],
				heading: `Select to compare rates, or create a 
				multiline quotation`,
				content: `Select multiple rate cards to compare the 
				rates between the shipping lines, & 
				create a multi shipping line quotation.`,
				subText         : '',
				sequence_number : 2,
			},
		},
	});

	const {
		refetchSearch = () => {},
		loading = false,
		data = {},
		filters = {},
		setFilters = () => {},
		screen,
		setScreen,
		setSelectedCard,
		selectedCard,
	} = useGetSpotSearch({ setComparisonRates });

	const {
		spot_search_detail:detail = {},
		list:rates = [],
		possible_subsidiary_services = [],
		total_count,
		page,
		page_limit,
	} = data || {};

	const paginationProps = { page, page_limit, total_count };

	const showAdditionalHeader = headerProps && !isEmpty(headerProps);

	if (loading && isEmpty(data) && screen === 'listRateCard') {
		return (
			<div className={styles.loading}>
				<span className={styles.loading_text}>Looking for Rates</span>
				<Loader themeType="primary" className={styles.loader} background="#000" />
			</div>
		);
	}

	return (
		<div className={cl`${styles.container} ${showAdditionalHeader ? styles.backdrop : {}}`}>
			<Header
				data={detail}
				showAdditionalHeader={showAdditionalHeader}
				setHeaderProps={setHeaderProps}
				headerProps={headerProps}
				loading={loading}
				activePage="search_results"
				currentScreen={screen}
				setCurrentScreen={setScreen}
				infoBanner={infoBanner}
				setInfoBanner={setInfoBanner}
			/>

			<div
				style={
					showAdditionalHeader || infoBanner.current === 'edit_button'
						? { opacity: 0.6, pointerEvents: 'none', background: '#000' }
						: null
				}
			>
				<FCLResults
					rates={rates}
					detail={detail}
					setSelectedCard={setSelectedCard}
					selectedCard={selectedCard}
					setScreen={setScreen}
					setComparisonRates={setComparisonRates}
					comparisonRates={comparisonRates}
					filters={filters}
					setFilters={setFilters}
					paginationProps={paginationProps}
					loading={loading}
					setHeaderProps={setHeaderProps}
					refetchSearch={refetchSearch}
					screen={screen}
					selectedWeek={selectedWeek}
					setSelectedWeek={setSelectedWeek}
					possible_subsidiary_services={possible_subsidiary_services}
					infoBanner={infoBanner}
					setInfoBanner={setInfoBanner}
				/>
			</div>
		</div>
	);
}

export default SearchResults;
