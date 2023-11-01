import { Button } from '@cogoport/components';
import { Link } from '@cogoport/next';
import ScopeSelect from '@cogoport/scope-select';

import useListMargins from '../hooks/useListMargins';

// import MarginValues from './MarginValues';
// import Search from './Search';
import styles from './styles.module.css';
import TabComponent from './TabComponent';
// import ListPagination from './TabComponent/ListPagination';

function MarginManagement() {
	const {
		data = {},
		loading = false,
		filterParams = {},
		setFilterParams = () => { },
		apiTrigger: refetch = () => { },
		marginBreakupData = {},
		setMarginBreakupData = () => { },
		activeTab = '',
		setActivetab = () => { },
		activeService = '',
		setActiveService = () => { },
	} = useListMargins({
		defaultParams  : { margin_stats_required: true, page_limit: 10 },
		defaultFilters : { margin_type: 'demand', service: '', status: 'active' },
	});

	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<h1 className={styles.heading}>
					Margin Management
					<ScopeSelect size="md" apisToConsider={['list_margins']} />
				</h1>
				<Link href="/margins/create" className={styles.button}>
					<Button size="lg" themeType="primary">CREATE NEW MARGIN</Button>
				</Link>
			</div>
			<TabComponent
				marginBreakupData={marginBreakupData}
				setMarginBreakupData={setMarginBreakupData}
				data={data}
				filterParams={filterParams}
				setFilterParams={setFilterParams}
				activeTab={activeTab}
				setActivetab={setActivetab}
				activeService={activeService}
				setActiveService={setActiveService}
				refetch={refetch}
				loading={loading}
			/>
		</div>
	);
}

export default MarginManagement;
