import { Popover, Button, Loader } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import ScopeSelect from '@cogoport/scope-select/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../common/EmptyState';
import ListPagination from '../../common/ListPagination';
import useListOrganizationServices from '../../hooks/useListOrganizationServices';

import CardComponent from './CardComponent';
import Filters from './Filters';
import SortComponent from './SortComponent';
import styles from './styles.module.css';
import TabsComponent from './TabsComponent';

function ServiceManagement() {
	const {
		data = {}, loading = false, filters = {},
		setFilters = () => { }, params = {}, setParams = () => {},
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
			<div className={styles.flex}>
				<h1>Service Management</h1>
				<ScopeSelect size="md" />
			</div>

			<div className={styles.flex}>
				<TabsComponent activeTab={activeTab} setActive={setActive} />
				<SortComponent params={params} setParams={setParams} activeTab={activeTab} />
				<Popover
					placement="bottom"
					content={(
						<Filters
							filters={filters}
							setFilters={setFilters}
							activeTab={activeTab}
						/>
					)}
				>
					<Button themeType="secondary">
						FILTERS
						<IcMFilter style={{ marginLeft: 8 }} />
					</Button>
				</Popover>
			</div>

			{isEmpty(data?.list)
				? <EmptyState />
				: (
					<div>
						<ListPagination paginationProps={paginationProps} />
						{data?.list?.map((item) => (
							<CardComponent
								key={item?.id}
								data={item}
								activeTab={activeTab}
							/>
						))}
						<ListPagination paginationProps={paginationProps} />
					</div>
				)}
		</div>
	);
}
export default ServiceManagement;
