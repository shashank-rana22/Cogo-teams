import { Table, Popover, Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { dynamic } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useMemo } from 'react';

import ListPagination from '../../../common/ListPagination';
import getColumns from '../../../config/ocean-tracking-columns';
import useListUntrackedContainers from '../../../hooks/useListUntrackedContainers';
import SearchFilters from '../../Filter/Search/search';

import styles from './styles.module.css';

const Filters = dynamic(() => import('../../Filter'), { ssr: false });
const EmptyState = dynamic(() => import('../../../common/EmptyState'), { ssr: false });
const UpdateTracking = dynamic(() => import('./UpdateTracking'), { ssr: false });

function OceanTracking() {
	const {
		data,
		loading,
		filters,
		setFilters,
		searchString,
		serialId,
		setSearchString,
		setSerialId,
		refetch,
	} = useListUntrackedContainers();

	const [filterVisible, setFilterVisible] = useState(false);
	const [showUpdate, setShowUpdate] = useState({ show: false, data: {} });

	const handleShowModal = (item) => setShowUpdate({ show: true, data: item?.data });

	const columns = useMemo(() => getColumns({
		handleShowModal,
		filters,
		setFilters,
	}), [setFilters, filters]);

	function CustomPagination() {
		return 	<ListPagination filters={filters} setFilters={setFilters} data={data} />;
	}

	return (
		<>
			<div className={styles.filter_container}>
				<SearchFilters
					searchString={searchString}
					serialId={serialId}
					setSearchString={setSearchString}
					activeTab="ocean_tracking"
					filters={filters}
					setFilters={setFilters}
					setSerialId={setSerialId}
				/>
				<Popover
					placement="bottom"
					theme="light"
					visible={filterVisible}
					onClickOutside={() => setFilterVisible(false)}
					content={filterVisible ? (
						<Filters
							filters={filters}
							setFilters={setFilters}
							setShow={setFilterVisible}
							show={filterVisible}
						/>
					) : null}
				>
					<Button themeType="secondary" size="md" onClick={() => setFilterVisible(!filterVisible)}>
						<IcMFilter />
						{' '}
						FILTERS
					</Button>
				</Popover>

			</div>

			<CustomPagination />

			<Table columns={columns || []} data={data?.list || []} loading={loading} className={styles.table} />

			{!loading && isEmpty(data?.list) ? <EmptyState /> : null}

			<CustomPagination />

			{showUpdate.show ? (
				<UpdateTracking
					showUpdate={showUpdate}
					setShowUpdate={setShowUpdate}
					refetchTrackingList={refetch}
				/>
			) : null}
		</>
	);
}

export default OceanTracking;
