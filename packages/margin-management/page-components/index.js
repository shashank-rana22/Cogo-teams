import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import ScopeSelect from '@cogoport/scope-select';

import useListMargins from '../hooks/useListMargins';

import styles from './styles.module.css';
import TabComponent from './TabComponent';

function MarginManagement() {
	const router = useRouter();

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
		defaultFilters : { margin_type: 'demand', service: '', status: 'active', is_partner_id_present: true },
	});

	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<div className={styles.heading}>
					<h1>Margin Management</h1>
					<ScopeSelect size="md" apisToConsider={['list_margins']} />
				</div>
				<Button
					onClick={() => router.push('/margins/create')}
					size="lg"
					themeType="primary"
				>
					+ Create New Margin
				</Button>
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
