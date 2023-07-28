import { Select, cl, Loader } from '@cogoport/components';
import { countriesHash } from '@cogoport/globalization/utils/getCountriesHash';
import { IcMArrowLeft, IcMDescendingSort } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useCallback, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import Heading from '../../../../common/Heading';
import { SORT_OPTIONS } from '../../../../constants/map_constants';

import GeoCoder from './GeoCoder';
import List from './List';
import styles from './styles.module.css';

const SCOPE_MAPPING = {
	continents : 'country',
	country    : 'region',
	region     : 'ports',
};

const TIMEOUT_TIME = 1000;
const SCROLLING_LIMIT = 30;
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
	activeList = [],
	setActiveId = () => {},
	page = 1,
	setPage = () => {},
	accuracyLoading = false,
	setActiveList = () => {},

}) {
	const originName = locationFilters.origin?.name || countriesHash?.[locationFilters?.origin?.id]?.name;
	const destinationType = locationFilters?.destination?.type || '';
	const destination = destinationType.includes('port')
		? locationFilters?.destination?.name : SCOPE_MAPPING[destinationType];

	const { list = [], total_count = 0 } = mapStatisticsData;
	const hasMore = page < Math.ceil(total_count / SCROLLING_LIMIT);

	const loadMore = useCallback(() => {
		setTimeout(() => {
			if (!accuracyLoading) {
				setPage((prev) => prev + START_PAGE);
			}
		}, TIMEOUT_TIME);
	}, [accuracyLoading, setPage]);

	useEffect(() => {
		if (!isEmpty(list)) {
			if (page === START_PAGE) {
				setActiveList([...list]);
			} else {
				setActiveList((prev) => prev.concat(list));
			}
		}
	}, [list, page, setActiveList]);

	return (
		<>
			<div className={cl`${styles.side_container} ${isFull && styles.hide}`}>
				<div className={styles.heading}>
					<Heading setView={setView} backView={backView} heading="Map View" showFilterText={false} />
				</div>
				<div className={styles.sticky_container}>
					<GeoCoder
						locationFilters={locationFilters}
						setLocationFilters={setLocationFilters}
						setHierarchy={setHierarchy}
						setActiveList={setActiveList}
					/>
					<div className={styles.horizontal_line} />
				</div>
				<div className={styles.list_container}>
					<div className={styles.list_header}>
						<h4>
							{`${startCase(originName)} to 
							${startCase(destination || 'Countries')}`}
						</h4>
						<Select
							size="sm"
							placeholder="sort by"
							prefix={<IcMDescendingSort />}
							options={SORT_OPTIONS}
							style={{ width: '160px' }}
						/>
					</div>
					<InfiniteScroll
						pageStart={1}
						initialLoad={false}
						loadMore={loadMore}
						hasMore={hasMore}
						loader={accuracyLoading ? (
							<div className={styles.loading_style}>
								<Loader />
							</div>
						) : null}
						useWindow={false}
						threshold={600}
					>
						<List
							setActiveId={setActiveId}
							loading={accuracyLoading}
							finalList={activeList}
							originName={originName}
						/>
						{!hasMore && !isEmpty(activeList) && !accuracyLoading && (
							<p className={styles.has_more}>
								You reached the end!!
							</p>
						)}

					</InfiniteScroll>
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
