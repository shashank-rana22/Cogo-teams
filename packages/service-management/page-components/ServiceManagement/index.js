import { Popover, Button, Loader } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { useState } from 'react';
import { v1 as uuid } from 'uuid';

import useListOrganizationServices from '../../hooks/useListOrganizationServices';

import CardComponent from './CardComponent';
import Filters from './Filters';
import ListPagination from './ListPagination';
import styles from './styles.module.css';
import TabsComponent from './TabsComponent';

function ServiceManagement() {
	const {
		data = {}, loading = false, filters = {},
		setFilters = () => { },
	} = useListOrganizationServices({
		defaultParams: {
			approvers_required       : true,
			last_applied_at_required : true,
		},
		defaultFilters: { status: 'pending_approval' },
	});
	const [activeTab, setActiveTab] = useState('pending_approval');
	const setActive = (value) => {
		setActiveTab(value);
		setFilters((p) => ({ ...p, status: value }));
	};
	if (loading) return (<Loader />);
	const paginationProps = { filters, setFilters, data };
	return (
		<div>
			<h1>Service Management</h1>
			<div className={styles.flex}>
				<TabsComponent activeTab={activeTab} setActiveTab={setActive} />
				<Popover placement="bottom" content={<Filters filters={filters} setFilters={setFilters} />}>
					<Button themeType="secondary">
						{' '}
						FILTERS
						<IcMFilter style={{ marginLeft: 8 }} />
					</Button>
				</Popover>
			</div>
			<ListPagination paginationProps={paginationProps} />
			{data?.list?.map((item, index) => (<CardComponent key={`${`${index}${uuid()}`}`} data={item} />))}
			<ListPagination paginationProps={paginationProps} />
		</div>
	);
}
export default ServiceManagement;
