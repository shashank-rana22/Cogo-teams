import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import Filter from '../../../../commons/Filters/index.tsx';
import CustomTable from '../../../../Settlement/page-components/History/CustomTable/index.tsx';
import EmptyStateDocs from '../../commons/EmptyStateDocs/index.tsx';
import useHistorySettlement from '../../hooks/useGetSettlement';

import styles from './styles.module.css';

const historyFilters = [
	{
		name    : 'accountType',
		type    : 'select',
		theme   : 'admin',
		options : [
			{ label: 'All', value: 'All' },
			{ label: 'On Account Payment', value: 'REC' },
			{ label: 'Credit Note', value: 'PCN' },
			{ label: 'Invoice', value: 'SINV' },
		],
		placeholder: 'All',
	},
	{
		name                  : 'date',
		type                  : 'singleDateRange',
		placeholder           : 'Date',
		theme                 : 'admin',
		maxDate               : new Date(),
		className             : 'primary md',
		defaultValue          : null,
		isPreviousDaysAllowed : true,
		span                  : 3,
	},
];

function History({ organizationId = '' }) {
	const {
		data = {}, loading = false, filters = {},
		setFilters = () => {}, apiData = {}, refetch = () => {},
	} = useHistorySettlement({ organizationId });

	const onPageChange = (val) => {
		setFilters({ ...filters, page: val });
	};

	return (
		<div>
			<div className={styles.filter_container}>
				<Filter controls={historyFilters} setFilters={setFilters} filters={filters} pageKey="page" />
				<div className={styles.toggle_Div}>
					<Input
						name="query"
						onChange={(val) => { setFilters({ ...filters, query: val, page: 1 }); }}
						placeholder="Search by Document Number"
						size="md"
						suffix={<IcMSearchlight height="20px" width="20px" />}
						className={styles.search_div}
					/>
				</div>
			</div>
			<CustomTable
				apiData={apiData}
				filters={filters}
				setFilters={setFilters}
				loading={loading}
				onPageChange={onPageChange}
				refetch={refetch}
				showFooter={false}
				source="outstanding"
			/>
			{!loading && isEmpty(data?.list) && <EmptyStateDocs />}
		</div>
	);
}

export default History;
