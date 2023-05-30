import { Table } from '@cogoport/components';

import AnalyticsFilter from '../../../../common/AnalyticsFilter';
import useGetListReferralMappings from '../../../../hooks/useGetListReferralMappings';
import TableColumns from '../List/TableColumn';

import styles from './styles.module.css';

function NetworkList({
	showPopover,
	filterValue,
	setFilterValue,
	setShowPopover,
	showOptions,
	setShowOptions,
	showActivityModal,
	setShowActivityModal,
}) {
	const { networkData = {}, loading = false, debounceQuery } = useGetListReferralMappings();
	const { list = [] } = networkData || {};

	return (
		<div className={styles.container}>
			<div className={styles.title}>Top 10 Networks</div>
			<AnalyticsFilter
				showPopover={showPopover}
				setShowPopover={setShowPopover}
				filterValue={filterValue}
				setFilterValue={setFilterValue}
				debounceQuery={debounceQuery}
			/>
			<Table
				columns={TableColumns({
					listType: 'network',
					showOptions,
					setShowOptions,
					showActivityModal,
					setShowActivityModal,
				})}
				data={list || []}
				loadingRowsCount={10}
				loading={loading}
			/>
		</div>
	);
}
export default NetworkList;
