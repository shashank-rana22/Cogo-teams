import { Popover, Input, Pagination, Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import EmptyPage from './EmptyPage';
import FilterContent from './FilterContent';
import useVendorList from './hooks/useVendorList';
import styles from './styles.module.css';
import TabularSection from './TabularSection';

function ListVendors() {
	const {
		loading,
		data = {},
		// GetVendorList = () => {},
		params = {},
		setParams = () => {},
		columns,
		showFilter,
		setShowFilter,
	} = useVendorList();

	const { total_count, page_limit:pageLimit } = data || {};
	const router = useRouter();

	const tagClick = ({ status:tagStatus }) => {
		setParams((prev) => ({
			...prev,
			filters: {
				status     : 'active',
				kyc_status : tagStatus,
			},
		}));
	};

	const { list = [] } = data;

	if (data.total_count === 0 && Object.keys(params?.filters).length === 1) {
		return <EmptyPage />;
	}

	return (
		<>
			<div className={styles.kyc}>
				<div
					role="presentation"
					className={styles.box}
					onClick={() => { tagClick({ status: 'pending_from_user' }); }}
				>
					<div className={styles.label}>Pending Vendors</div>
					<div className={styles.value}>1222</div>
				</div>
				<div role="presentation" className={styles.box} onClick={() => { tagClick({ status: 'verified' }); }}>
					<div className={styles.label}>Verified Vendors</div>
					<div className={styles.value}>1222</div>
				</div>
			</div>
			<div className={styles.group}>
				<h3 className={styles.title}>All Vendors</h3>
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
						<p className={styles.text}>Filter</p>
						<IcMFilter style={{ margin: '2px 2px 2px 4px' }} />
					</div>
				</Popover>
				<Input
					value={params.filters?.q}
					onChange={(value) => setParams((pv) => ({
						...pv,
						filters: { ...pv.filters, q: value || undefined },
					}))}
					placeholder="Start type content name to search..."
				/>

				<Button role="presentation" onClick={() => router.push('/onboard-vendor')}>
					ADD NEW VENDOR
				</Button>
			</div>

			<TabularSection
				loading={loading}
				data={list}
				columns={columns}
			/>

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
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
