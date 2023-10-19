import { Button } from '@cogoport/components';
import SmartComponents from '@cogoport/smart-components';
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

	return (
		<div>
			{
				showAddModal ? <Add show={showAddModal} setShow={setShowAddModal} refetch={refetch} /> : null
			}
			<SmartComponents>
				<div className={styles.header}>
					<h2>Pass Through Customers</h2>
					<Button onClick={() => setShowAddModal((prev) => !prev)}>ADD PASS THROUGH CUSTMER</Button>
				</div>
				<ListPagination data={tableData} filters={filters} setFilters={setFilters} />
				<ViewTable
					columns={getTableColumns()}
					data={tableData?.list || []}
					loading={loading}
				/>
			</SmartComponents>
		</div>
	);
}

export default PassThroughCustomers;
