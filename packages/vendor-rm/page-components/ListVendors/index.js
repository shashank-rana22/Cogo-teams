import { Popover, Input, Pagination, Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import EmptyPage from './EmptyPage';
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
	} = useVendorList();

	const {
		// loadingStats,
		data: dataStats,
	} = useVendorStats();

	const { total_count, page_limit: pageLimit } = data || {};

	const router = useRouter();

	const { list = [] } = data;

	const isFilterEmpty = Object.keys(params?.filters).length === 1;

	if (data.total_count === 0 && isFilterEmpty) {
		return <EmptyPage />;
	}

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
								!isFilterEmpty ? (
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
							value={params.filters?.q}
							onChange={(value) => setParams((pv) => ({
								...pv,
								filters: { ...pv.filters, q: value || undefined },
							}))}
							placeholder="Search by PAN / GST / Business Name..."
						/>
					</div>

					<div className={styles.button_container}>
						<Button
							size="lg"
							role="presentation"
							onClick={() => router.push('/onboard-vendor')}
							themeType="accent"
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
		</>

	);
}

export default ListVendors;
