import { Loader, Button } from '@cogoport/components';
import { Link } from '@cogoport/next';
import ScopeSelect from '@cogoport/scope-select';
import { useState } from 'react';

import useListMargins from '../hooks/useListMargins';

import MarginValues from './MarginValues';
import Search from './Search';
import styles from './styles.module.css';
import TabComponent from './TabComponent';

function MarginManagement() {
	const {
		data = {}, loading = false, filterParams = {}, setFilterParams = () => {}, apiTrigger:refetch = () => {},
	} = useListMargins({
		defaultParams:
		{ margin_stats_required: true, page_limit: 5 },
		defaultFilters: { margin_type: 'demand', service: '', status: 'active' },

	});
	const [marginBreakupData, setMarginBreakupData] = useState({});
	const [activeTab, setActivetab] = useState('demand');
	const [activeService, setActiveService] = useState('');
	if (loading) return (<Loader themeType="primary" />);
	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<div className={styles.heading}>Margin Management</div>
				<ScopeSelect size="md" />
			</div>
			<div className={styles.search}>
				<div className={styles.flex}>
					<Search
						activeTab={activeTab}
						className={styles.search_button}
						setFilterParams={setFilterParams}
						filterParams={filterParams}
					/>
					<Link href="/margins/create" className={styles.button}>
						<Button themeType="primary">CREATE NEW MARGIN</Button>
					</Link>
				</div>

				{activeTab !== 'multi_entity_margin' ? (
					<div className={styles.button}>
						<MarginValues
							data={marginBreakupData}
							setMarginBreakupData={setMarginBreakupData}
							activeTab={activeTab}
							refetch={refetch}
						/>
					</div>
				) : null}
			</div>

			<div className={styles.flex}>
				<div style={{ width: activeTab === 'multi_entity_margin' ? '100vw' : '75vw' }}>
					<TabComponent
						setMarginBreakupData={setMarginBreakupData}
						data={data}
						filterParams={filterParams}
						setFilterParams={setFilterParams}
						activeTab={activeTab}
						setActivetab={setActivetab}
						activeService={activeService}
						setActiveService={setActiveService}
					/>
				</div>
			</div>
		</div>
	);
}

export default MarginManagement;
