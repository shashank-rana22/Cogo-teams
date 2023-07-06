import { Toggle } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import StyledTable from '../../commons/StyledTable/index.tsx';

import EntityConfig from './Configuration/EntityConfig';
import CustomTable from './CustomTable';
import Header from './Header';
import useGetEntityList from './hooks/useGetEntityList';
import SelectFilters from './SelectFilters';
import styles from './styles.module.css';

function Treasury() {
	const { query } = useRouter();

	const {
		entityListData,
		reportsListData,
		entityListLoading,
		reportsListLoading,
		refetch,
		entityFilters,
		setEntityFilters,
	} = useGetEntityList();

	const { list = [] } = entityListData || {};

	const onPageChange = (val) => {
		setEntityFilters({ ...entityFilters, pageIndex: val });
	};
	const handleVersionChange = () => {
		window.location.href = `/${query.partner_id}/business-finance/account-payables/treasury-chest`;
	};

	return (
		<>
			<div className={styles.header_div}>
				<Header filters={entityFilters} setFilters={setEntityFilters} />
				<Toggle
					name="toggle"
					size="md"
					onLabel="Old"
					offLabel="New"
					onChange={handleVersionChange}
				/>
			</div>
			<SelectFilters
				filters={entityFilters}
				setFilters={setEntityFilters}
			/>

			{entityFilters?.activeEntity === 'reports'
				? (
					<CustomTable
						data={reportsListData}
						onPageChange={onPageChange}
						loading={reportsListLoading}
						filters={entityFilters}
						setFilters={setEntityFilters}
					/>
				) : (
					<StyledTable
						data={list}
						columns={EntityConfig({ refetch })}
						loading={entityListLoading}
						imageFind="FinanceDashboard"
					/>
				)}
		</>
	);
}

export default Treasury;
