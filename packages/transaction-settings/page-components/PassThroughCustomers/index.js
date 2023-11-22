import { Button, Toggle } from '@cogoport/components';
import { useHandleVersionChangeToOld } from '@cogoport/next';
import React, { useState } from 'react';

import ListPagination from '../../common/ListPagination';
import ViewTable from '../../common/ViewTable';
import useListOrganizationSettings from '../../hooks/useListOrganizationSettings';

import Add from './Add';
import getTableColumns from './getTableColumns';
import styles from './style.module.css';

function PassThroughCustomers() {
	const [showAddModal, setShowAddModal] = useState(false);
	const {
		loading, data : tableData,
		filters = {}, setFilters = () => {}, refetch = () => {},
	} = 	useListOrganizationSettings();

	const { handleRouteChange } = useHandleVersionChangeToOld({});

	return (
		<div>
			{
				showAddModal ? <Add show={showAddModal} setShow={setShowAddModal} refetch={refetch} /> : null
			}
			<div className={styles.wrapper}>
				<div className={styles.header}>
					<h2>Pass Through Customers</h2>
					<div className={styles.header_right_section}>
						<Button onClick={() => setShowAddModal((prev) => !prev)}>ADD PASS THROUGH CUSTMER</Button>
						<Toggle
							size="md"
							onLabel="Old"
							offLabel="New"
							onChange={handleRouteChange}
						/>
					</div>
				</div>
				<ListPagination data={tableData} filters={filters} setFilters={setFilters} />
				<ViewTable
					columns={getTableColumns()}
					data={tableData?.list || []}
					loading={loading}
				/>
				<ListPagination data={tableData} filters={filters} setFilters={setFilters} />
			</div>
		</div>
	);
}

export default PassThroughCustomers;
