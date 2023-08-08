import { Input, Pagination, Placeholder } from '@cogoport/components';
import { IcMArrowBack, IcMSearchlight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import Filter from '../../../../commons/Filters/index.tsx';
import StyledTable from '../../../../commons/StyledTable/index.tsx';
import useViewDataList from '../../../hooks/useViewDataList';
import { getSupplierData } from '../helper';

import filterControls from './filterControls';
import styles from './styles.module.css';
import viewColumn from './ViewColumn';

const EMPTY_STATE_IMAGE = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/list_emptystate.png';
const PAGE_INDEX = 1;
const TOTAL_RECORDS = 0;
const PAGE_SIZE = 10;

function View() {
	const [filters, setFilters] = useState({});
	const { push, query } = useRouter();
	const goBack = () => {
		push(
			'/business-finance/compliance/[active_tab]/[sub_active_tab]',
			'/business-finance/compliance/register/outward',
		);
	};
	const {
		data, loading, page,
		setPage,
	} = useViewDataList({
		id            : query?.id,
		docType       : filters?.docType,
		irnStatus     : filters?.irnStatus,
		tradePartyGst : filters?.tradePartyGst,
	});

	const { supplierName = '', suppGstIn = '', entity:entityCode = '', list, totalRecord } = data || {};

	return (
		<div>
			<div className={styles.back_button} onClick={goBack} role="presentation">
				<IcMArrowBack height="20px" width="20px" />
				<div className={styles.go_back}>GO BACK</div>
			</div>
			<div className={styles.supplier_card}>
				{ loading ? <Placeholder />
					: getSupplierData(supplierName, suppGstIn, entityCode).map((item) => (
						<div key={item?.heading} className={styles.name_value}>
							{item?.heading}
							<div className={styles.value_data}>{item?.value}</div>
						</div>
					))}
			</div>

			<div className={styles.filters_data}>
				<Filter controls={filterControls} setFilters={setFilters} filters={filters} pageKey="page" />

				<div>
					<Input
						value={filters?.tradePartyGst || ''}
						onChange={(value) => {
							setFilters((prev) => ({
								...prev,
								tradePartyGst: value,
							}));
						}}
						placeholder="Search by Trade Party GST"
						size="sm"
						style={{ width: '340px' }}
						suffix={(
							<IcMSearchlight
								height={20}
								width={20}
							/>
						)}
					/>
				</div>
			</div>

			<div className={styles.table_body}>
				<StyledTable data={list} columns={viewColumn} loading={loading} imageFind={EMPTY_STATE_IMAGE} />
			</div>

			<div className={styles.pagination_container}>
				<Pagination
					type="number"
					totalItems={totalRecord || TOTAL_RECORDS}
					currentPage={page || PAGE_INDEX}
					pageSize={PAGE_SIZE}
					onPageChange={setPage}
				/>
			</div>

		</div>
	);
}
export default View;
