import { Loader } from '@cogoport/components';

import useListMargins from '../hooks/useListMargins';

import styles from './styles.module.css';
import TabComponent from './TabComponent';

function MarginManagement() {
	const {
		data, loading, filterParams, setFilterParams,
	} = useListMargins({
		defaultParams:
		{ margin_stats_required: true, page_limit: 5 },
		defaultFilters: { status: 'active' },
	});

	if (loading) return (<Loader themeType="primary" />);
	return (
		<div>
			<div className={styles.heading}>Margin Management</div>
			<TabComponent data={data} filterParams={filterParams} setFilterParams={setFilterParams} />
		</div>
	);
}

export default MarginManagement;
