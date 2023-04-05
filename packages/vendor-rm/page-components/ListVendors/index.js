import { Popover, Input, Pagination, Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import FilterContent from './FilterContent';
import Header from './Header';
import useVendorList from './hooks/useVendorList';
import useVendorStats from './hooks/useVendorStats';
import KycStatusTabs from './KycStatusTabs';
import styles from './styles.module.css';
import TabularSection from './TabularSection';

function ListVendors() {
	const {
		loading,
		data = {},
		params = {},
		setParams = () => {},
		columns,
		showFilter,
		setShowFilter,
		searchValue,
		handleChangeQuery,
		isFilterInUse,
	} = useVendorList();

	const {
		data: dataStats,
	} = useVendorStats();

	const { total_count, page_limit: pageLimit } = data || {};

	const router = useRouter();

	const { list = [] } = data;

	return (
		<>
			<Header />

			<KycStatusTabs
				params={params}
				setParams={setParams}
				dataStats={dataStats}
			/>

			<div className={styles.group}>
				<div className={styles.heading}>
					<h3 className={styles.title}>All Vendors</h3>
				</div>

				<div className={styles.actions_container}>
					<Popover
						theme="light"
						placement="bottom"
						visible={showFilter}
						content={(
							<FilterContent
								setParams={setParams}
								setShowFilter={setShowFilter}
							/>

						)}
						interactive
					>
						<div
							role="presentation"
							className={styles.filter_container}
							onClick={() => setShowFilter(!showFilter)}
						>
							{
								isFilterInUse ? (
									<div className={styles.filter_in_use} />
								) : null
							}
							<p className={styles.text}>Filter</p>
							<IcMFilter style={{ margin: '2px 2px 2px 4px' }} />
						</div>
					</Popover>

					<div className={styles.input_wrapper}>
						<Input
							size="md"
							value={searchValue}
							onChange={(value) => handleChangeQuery(value)}
							placeholder="Search by PAN / GST / Business Name..."
						/>
					</div>

					<div className={styles.button_container}>
						<Button
							size="lg"
							role="presentation"
							type="button"
							onClick={() => router.push('/onboard-vendor')}
							themeType="primary"
						>
							Add New Vendor
						</Button>
					</div>
				</div>

			</div>

			<TabularSection
				loading={loading}
				data={list}
				columns={columns}
			/>

			{list?.length > 10 && (
				<div className={styles.pagination_container}>
					<Pagination
						type="number"
						currentPage={params?.page}
						totalItems={total_count}
						pageSize={pageLimit}
						onPageChange={(value) => setParams((pv) => ({
							...pv,
							page: value,
						}))}
					/>
				</div>
			)}
		</>
	);
}

export default ListVendors;
