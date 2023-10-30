import { Select, Loader, cl } from '@cogoport/components';
import { countriesHash } from '@cogoport/globalization/utils/getCountriesHash';
import { IcMArrowLeft } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useCallback, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { FILTER_OPTIONS } from '../../../../constants/map_constants';
import Heading from '../../Heading';

import GeoCoder from './GeoCoder';
import List from './List';
import styles from './styles.module.css';

const SCOPE_MAPPING = {
	continents : 'country',
	country    : 'ports',
};

const TIMEOUT_TIME = 400;
const START_PAGE = 1;

function SidePanel({
	setView = () => {},
	backView = () => {},
	setHierarchy = () => {},
	mapStatisticsData = {},
	isFull = false,
	setIsFull = () => {},
	locationFilters = {},
	setLocationFilters = () => {},
	setGlobalFilters = () => {},
	activeList = [],
	globalFilters = {},
	setActiveId = () => {},
	page = 1,
	setPage = () => {},
	accuracyLoading = false,
	setActiveList = () => {},
	setFilterBy = () => {},
	filterBy = '',
}) {
	const originName = locationFilters.origin?.name || countriesHash?.[locationFilters?.origin?.id]?.name;
	const destinationType = locationFilters?.destination?.type || '';
	const destination = destinationType.includes('port')
		? locationFilters?.destination?.name : SCOPE_MAPPING[destinationType];

	const { list = [], total_pages = 0 } = mapStatisticsData;
	const hasMore = page < total_pages;
	const { service_type } = globalFilters;

	const loadMore = useCallback(() => {
		setTimeout(() => {
			if (!accuracyLoading && hasMore) {
				setPage(page + START_PAGE);
			}
		}, TIMEOUT_TIME);
	}, [accuracyLoading, hasMore, page, setPage]);

	useEffect(() => {
		if (page !== START_PAGE) {
			setActiveList(activeList.concat(list));
		} else {
			setActiveList([...list]);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(list)]);

	return (
		<>
			<div className={cl`${styles.side_container} ${isFull && styles.hide}`}>
				<div className={styles.heading}>
					<Heading
						setView={setView}
						backView={backView}
						heading="Map View"
						showFilterText={false}
						globalFilters={globalFilters}
						setGlobalFilters={setGlobalFilters}
						showFilters
						view="map_view"
					/>
				</div>
				<div className={styles.sticky_container}>
					<GeoCoder
						locationFilters={locationFilters}
						setLocationFilters={setLocationFilters}
						setHierarchy={setHierarchy}
						setActiveList={setActiveList}
						service_type={service_type}
					/>
					<div className={styles.horizontal_line} />
				</div>
				<div className={styles.list_container}>
					<div className={styles.list_header}>
						<h4>
							<span className={styles.elipsis}>{startCase(originName)}</span>
							<span>{` to ${startCase(destination || 'Countries')}`}</span>
						</h4>
						<Select
							size="sm"
							placeholder="Filter by"
							options={FILTER_OPTIONS}
							style={{ width: '140px' }}
							value={filterBy}
							onChange={(val) => setFilterBy(val)}
						/>
					</div>
					<InfiniteScroll
						pageStart={1}
						initialLoad={false}
						loadMore={loadMore}
						hasMore={hasMore}
						useWindow={false}
						threshold={500}
						loader={<div className={styles.mini_loader}><Loader /></div>}
					>
						<List
							key={`${filterBy} ${destination}`}
							setActiveId={setActiveId}
							loading={accuracyLoading}
							finalList={activeList}
							originName={originName}
							filterBy={filterBy}
						/>
					</InfiniteScroll>
					{!hasMore && !isEmpty(activeList) && !accuracyLoading && (
						<h4 className={styles.has_more}>
							You reached the end!!
						</h4>
					)}
				</div>
			</div>
			<button
				onClick={() => setIsFull((s) => !s)}
				className={cl`${styles.toggle_icon} ${isFull ? styles.rotate_toggle : ''}`}
			>
				<IcMArrowLeft />
			</button>
		</>
	);
}

export default SidePanel;
