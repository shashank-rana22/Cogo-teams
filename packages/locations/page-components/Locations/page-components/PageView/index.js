import { TabPanel, Tabs, Table } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import ListPagination from '../../../../common/ListPagination';
import getFieldsByTab from '../../constants/config';
import getTabsMapping from '../../constants/tabs';

import styles from './styles.module.css';

function PageView({
	onClickCard = () => {},
	setSelectedLocation = () => {},
	setSideBar = () => {}, filters = {}, setFilters = () => {},
	data = {},
	loading = false,
}) {
	const { t } = useTranslation(['locations']);

	const { type } = filters || {};
	const columns = getFieldsByTab({ type, t });

	const tabsMapping = getTabsMapping({ t });

	const onTabChange = (val) => {
		setFilters({ type: val, page: 1 });
		setSelectedLocation({});
		setSideBar('');
	};

	return (
		<div className={styles.container} id="locations_main_container">

			<Tabs themeType="primary" activeTab={filters.type} onChange={onTabChange} id="locations_tab_view">
				{(tabsMapping || []).map(({
					label = '',
					value = '',
				}) => <TabPanel key={label} name={value} title={label} />)}
			</Tabs>

			<ListPagination
				filters={filters}
				setFilters={setFilters}
				data={data}
			/>

			<Table
				className={styles.table}
				columns={columns}
				data={data?.list || []}
				loading={loading}
				onRowClick={onClickCard}
			/>

			<ListPagination
				filters={filters}
				setFilters={setFilters}
				data={data}
			/>

		</div>
	);
}

export default PageView;
