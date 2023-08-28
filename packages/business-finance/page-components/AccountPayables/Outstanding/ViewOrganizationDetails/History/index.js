import { Input, Toggle } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import Filter from '../../../../commons/Filters/index.tsx';
import { historyFilters } from '../../../../Settlement/configurations/history-filters.tsx';
import CustomTable from '../../../../Settlement/page-components/History/CustomTable/index.tsx';
import SelectState from '../../../../Settlement/page-components/History/SelectState/index.tsx';
import EmptyStateDocs from '../../commons/EmptyStateDocs/index.tsx';
import useHistorySettlement from '../../hooks/useGetSettlement';

import styles from './styles.module.css';

function History({ organizationId = '' }) {
	const { query } = useRouter();

	const { data, loading, filters, setFilters, apiData, refetch } = useHistorySettlement({ organizationId });

	const handleVersionChange = () => {
		window.location.href = `/${query.partner_id}/business-finance/settlement/history`;
	};

	const onPageChange = (val) => {
		setFilters({ ...filters, page: val });
	};

	return (
		<div>
			<div className={styles.filter_container}>
				<Filter controls={historyFilters()} setFilters={setFilters} filters={filters} pageKey="page" />
				<div className={styles.toggle_Div}>
					<Toggle
						name="toggle"
						size="md"
						onLabel="Old"
						offLabel="New"
						onChange={handleVersionChange}
					/>
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
			{filters?.orgId && (
				<CustomTable
					apiData={apiData}
					filters={filters}
					setFilters={setFilters}
					loading={loading}
					onPageChange={onPageChange}
					refetch={refetch}
				/>
			)}
			{!filters?.orgId && <SelectState />}
			{!loading && isEmpty(data?.list) && <EmptyStateDocs />}
		</div>
	);
}

export default History;
