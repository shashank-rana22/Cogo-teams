import { Loader, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Router } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import Header from '../../../common/Header';
import CustomLoadingState from '../../../common/LoadingState/CustomLoadingState';
import DotLoader from '../../../common/LoadingState/DotLoader';
import useGetIsMobile from '../../../helpers/useGetIsMobile';
import useCreateSearch from '../../ServiceDiscovery/SpotSearch/hooks/useCreateSearch';
import useGetSpotSearch from '../hooks/useGetSpotSearch';
import getRedirectionDetails from '../utils/getRedirectionDetails';

import AIRResults from './AirResults';
import FCLResults from './FCLResults';
import FTLResults from './FTLResults';
import styles from './styles.module.css';

const COMPONENT_MAPPING = {
	fcl_freight : FCLResults,
	air_freight : AIRResults,
	ftl_freight : FTLResults,
};

function SearchResults() {
	const { user:{ id }, query = {}, partner_id = '' } = useSelector(({ profile, general }) => ({
		user       : profile.user,
		query      : general?.query,
		partner_id : profile?.partner?.id,
	}));

	const { redirect_required = 'true' } = query || {};

	const [routerLoading, setRouterLoading] = useState(false);
	const [scheduleLoading, setScheduleLoading] = useState(false);
	const [headerProps, setHeaderProps] = useState({});
	const [comparisonRates, setComparisonRates] = useState([]);
	const [infoBanner, setInfoBanner] = useState({});

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
		setSelectedSchedule = () => {},
		selectedSchedule = {},
	} = useGetSpotSearch({ setComparisonRates, setInfoBanner, setRouterLoading, setScheduleLoading });

	const isMobile = useGetIsMobile();

	const { createSearch, loading: createLoading } = useCreateSearch({ setRouterLoading, setHeaderProps });

	const {
		spot_search_detail:detail = {},
		contract_detail = {},
		possible_subsidiary_services = [],
		total_count,
		page_limit,
		touch_points = {},
	} = data || {};

	const paginationProps = { page, page_limit, total_count };

	const showAdditionalHeader = headerProps && !isEmpty(headerProps);

	useEffect(() => {
		Router.events.on('routeChangeComplete', () => {
			setRouterLoading(false);
		});
	}, [setRouterLoading]);

	if (loading && isEmpty(data) && screen === 'listRateCard') {
		return (
			<div className={styles.loading}>
				<span className={styles.loading_text}>Fetching Best Possible Rates</span>
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

	const { service_type = '' } = detail;

	const ActiveComponent = COMPONENT_MAPPING[service_type];

	if (!ActiveComponent) return null;

	return (
		<div className={cl`${styles.container} ${
			(showAdditionalHeader || (infoBanner.current === 'edit_button' && !isGuideViewed))
				? styles.backdrop : {}} ${(routerLoading || scheduleLoading) && styles.disabled}`}
		>
			{routerLoading || scheduleLoading ? <CustomLoadingState loadingText="Loading Rates" /> : null}

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
				touch_points={touch_points}
				createSearch={createSearch}
				createLoading={createLoading}
				isMobile={isMobile}
			/>

			<div
				style={
					(showAdditionalHeader || (infoBanner.current === 'edit_button' && !isGuideViewed))
						? { opacity: 0.6, pointerEvents: 'none', background: '#fff' }
						: null
				}
				className={styles.children}
			>
				<ActiveComponent
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
					possible_subsidiary_services={possible_subsidiary_services}
					infoBanner={infoBanner}
					setInfoBanner={setInfoBanner}
					isGuideViewed={isGuideViewed}
					setRouterLoading={setRouterLoading}
					setScheduleLoading={setScheduleLoading}
					scheduleLoading={scheduleLoading}
					setSelectedSchedule={setSelectedSchedule}
					selectedSchedule={selectedSchedule}
					isMobile={isMobile}
				/>
			</div>
		</div>
	);
}

export default SearchResults;
