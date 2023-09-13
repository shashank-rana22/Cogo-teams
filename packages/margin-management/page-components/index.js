import { Loader, Button } from '@cogoport/components';
import { Link } from '@cogoport/next';
import { useState } from 'react';

import useListMargins from '../hooks/useListMargins';

import MarginValues from './MarginValues';
import Search from './Search';
import styles from './styles.module.css';
import TabComponent from './TabComponent';

function MarginManagement() {
	const {
		data, loading, filterParams, setFilterParams, apiTrigger,
	} = useListMargins({
		defaultParams:
		{ margin_stats_required: true, page_limit: 5 },
	});
	const [marginBreakupData, setMarginBreakupData] = useState({});
	const [activeTab, setActivetab] = useState((filterParams?.status === 'approval_pending')
		? 'approval_pending' : filterParams?.margin_type);
	if (loading) return (<Loader themeType="primary" />);
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Margin Management</div>
			<div className={styles.flex}>
				<div className={styles.tab}>
					<TabComponent
						setMarginBreakupData={setMarginBreakupData}
						data={data}
						filterParams={filterParams}
						setFilterParams={setFilterParams}
						refetch={apiTrigger}
						activeTab={activeTab}
						setActivetab={setActivetab}
					/>
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
					<div className={styles.margin}>
						<MarginValues
							data={marginBreakupData}
							setMarginBreakupData={setMarginBreakupData}
							activeTab={activeTab}
						/>
					</div>
				</div>
			</div>

		</div>
	);
}

export default MarginManagement;
