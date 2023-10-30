import { Toggle } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useEffect } from 'react';

import StyledTable from '../../commons/StyledTable/index';

import EntityConfig from './Configuration/EntityConfig';
import CustomTable from './CustomTable';
import Header from './Header';
import useGetEntityList from './hooks/useGetEntityList';
import SelectFilters from './SelectFilters';
import styles from './styles.module.css';

function Treasury({ currentEntity, setActiveEntity }) {
	const { query } = useRouter();

	const {
		entityListData,
		reportsListData,
		entityListLoading,
		reportsListLoading,
		refetch,
		entityFilters,
		setEntityFilters,
	} = useGetEntityList({ currentEntity });

	const { list = [] } = entityListData || {};

	const onPageChange = (val) => {
		setEntityFilters((prev) => ({ ...prev, pageIndex: val }));
	};
	const handleVersionChange = () => {
		window.location.href = `/${query.partner_id}/business-finance/account-payables/treasury-chest`;
	};

	useEffect(() => {
		if (currentEntity) {
			setEntityFilters((prev) => ({ ...prev, activeEntity: currentEntity }));
		}
	}, [currentEntity, setEntityFilters]);

	return (
		<>
			<div className={styles.header_div}>
				<Header
					filters={entityFilters}
					setFilters={setEntityFilters}
					currentEntity={currentEntity}
					setActiveEntity={setActiveEntity}
				/>
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
