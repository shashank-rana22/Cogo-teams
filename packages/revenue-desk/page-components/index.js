import { Select, Input, Pagination, Button, Placeholder } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import { serviceOptions, sortByOptions } from '../helper/filterOptionMapping';
import useGetRDShipmentList from '../hooks/useGetRDShipmentList';

import { VALUE_TWO, VALUE_ZERO } from './constants';
import DetailPage from './DetailPage';
import Filters from './Filters';
import List from './List';
import styles from './styles.module.css';

function RevenueDesk() {
	const [showDetailPage, setShowDetailPage] = useState();
	const {
		loading,
		shipmentList,
		filters,
		setFilters,
	} = useGetRDShipmentList();
	return (
		<div>
			{showDetailPage ? (
				<DetailPage
					setShowDetailPage={setShowDetailPage}
					showDetailPage={showDetailPage}
				/>
			) : 	(
				<div>
					<div className={styles.heading}>Revenue Desk</div>
					<div className={styles.sub_section}>
						<div className={styles.service_outer_container}>
							<div className={styles.service_container}>
								<Select
									placeholder="Select Service"
									size="sm"
									value={filters?.service}
									onChange={(val) => setFilters({
										service  : val,
										sort_by  : 'created_at_desc',
										page     : 1,
										state    : 'active',
										rd_state : 'active',
									})}
									options={serviceOptions}
								/>
							</div>
						</div>
						<div className={styles.select_outer_container}>
							<div className={styles.select_container}>
								<Select
									placeholder="Sort By"
									size="sm"
									value={filters?.sort_by}
									onChange={(value) => setFilters({ ...filters, sort_by: value, page: 1 })}
									options={['air_freight', 'fcl_freight'].includes(filters?.service)
										? sortByOptions : sortByOptions.slice(VALUE_ZERO, VALUE_TWO)}
								/>
							</div>
							<div className={styles.select_container}>
								<Input
									prefix={<IcMSearchlight />}
									placeholder="Search SID"
									size="sm"
									value={filters?.q}
									onChange={(value) => setFilters({ ...filters, q: value, page: 1 })}
								/>
							</div>
						</div>
					</div>

					<div className={styles.body}>
						<div
							className={styles.filter}
						>
							<div className={styles.filter_heading}>
								<div className={styles.text}>
									Filters
									{loading ? (
										<Placeholder
											height="20px"
											width="100px"
											margin="0px 5px"
										/>
									) : (
										<div className={styles.search_text}>
											-
											{shipmentList?.total_count || VALUE_ZERO}
											{' '}
											Search Results
										</div>
									)}

								</div>
								<div>
									<Button
										size="sm"
										themeType="link"
										style={{ color: '#221F20' }}
										onClick={() => setFilters((prev) => ({
											service : prev.service,
											sort_by : prev.sort_by,
										}))}
									>
										Clear All
									</Button>
								</div>
							</div>
							<Filters filters={filters} setFilters={setFilters} />
						</div>
						<div className={styles.cardlist}>
							<List
								shipmentList={shipmentList?.list}
								loading={loading}
								setShowDetailPage={setShowDetailPage}
							/>
						</div>
					</div>
					<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
						<Pagination
							className={styles.pagination}
							type="table"
							currentPage={filters?.page}
							pageSize={10}
							totalItems={shipmentList?.total_count}
							onPageChange={(val) => {
								setFilters({ ...filters, page: val });
							}}
						/>
					</div>

				</div>
			)}
		</div>

	);
}
export default RevenueDesk;
