import { Loader, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import Header from '../../common/Header';
import DotLoader from '../../common/LoadingState/DotLoader';
import TryOldBanner from '../../common/TryOldBanner';

import getRedirectionDetails from './getRedirectionDetails';
import useGetSpotSearch from './hooks/useGetSpotSearch';
import FCLResults from './page-components/FCLResults';
import styles from './styles.module.css';

function SearchResults() {
	const { user:{ id }, query, partner_id = '' } = useSelector(({ profile, general }) => ({
		user       : profile.user,
		query      : general?.query,
		partner_id : profile?.partner?.id,
	}));

	const { redirect_required = 'true' } = query;

	const [routerLoading, setRouterLoading] = useState(false);
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

	const isGuideViewed = localStorage.getItem(`guide_completed_for_${id}`) || false;

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
		page = 1,
		rates = [],
	} = useGetSpotSearch({ setComparisonRates });

	const {
		spot_search_detail:detail = {},
		contract_detail = {},
		possible_subsidiary_services = [],
		total_count,
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

	const isServiceSupported = GLOBAL_CONSTANTS.new_search_supported_services.includes(detail?.service_type);

	if (
		!isEmpty(detail)
		&& redirect_required === 'true'
		&& (!detail?.tags?.includes('version2') || !isServiceSupported)
	) {
		const { url = '', message = '' } = getRedirectionDetails({
			tags                 : detail.tags,
			redirect_required,
			id                   : detail.id,
			importer_exporter_id : detail.importer_exporter_id,
			partner_id,
			shipment_id          : detail.shipment_id,
		});

		window.location.replace(url);

		return (
			<div className={styles.spinner_container}>
				<DotLoader />
				<div className={styles.text}>{message}</div>
			</div>
		);
	}

	return (
		<div className={cl`${styles.container} ${
			(showAdditionalHeader || (infoBanner.current === 'edit_button' && !isGuideViewed))
				? styles.backdrop : {}}`}
		>
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
				isGuideViewed={isGuideViewed}
				service_key="service_type"
				setRouterLoading={setRouterLoading}
			/>

			<div
				style={
					(showAdditionalHeader || (infoBanner.current === 'edit_button' && !isGuideViewed))
						? { opacity: 0.6, pointerEvents: 'none', background: '#fff' }
						: null
				}
				className={styles.children}
			>
				<TryOldBanner />

				<FCLResults
					rates={rates}
					detail={detail}
					contract_detail={contract_detail}
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
					isGuideViewed={isGuideViewed}
					routerLoading={routerLoading}
					setRouterLoading={setRouterLoading}
				/>
			</div>
		</div>
	);
}

export default SearchResults;
