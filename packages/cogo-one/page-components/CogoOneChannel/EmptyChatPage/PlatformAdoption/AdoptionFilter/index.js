import { Popover } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';

import FilterContent from '../FilterContent';

import styles from './styles.module.css';

function AdoptionFilter({ setFilterValues = () => {}, filterValues = {}, initialViewType = '', pageType = '' }) {
	const {
		show = false, requestType = '',
		assignTo = '',
		escalationCycle = '',
		requestStatus = '',
		start = null,
		end = null,
		requestCompleted = '',
	} = filterValues || {};

	const isFilterApplied = requestStatus || requestType || assignTo || escalationCycle || start
	|| end || requestCompleted;

	return (
		<Popover
			visible={show}
			placement="left"
			render={(
				<FilterContent
					setFilterValues={setFilterValues}
					initialViewType={initialViewType}
					pageType={pageType}
				/>
			)}
			interactive
			onClickOutside={() => setFilterValues((prev) => ({ ...prev, show: false }))}
			className={styles.styled_popover}
		>
			<div
				className={styles.filter_section}
				role="presentation"
				onClick={() => setFilterValues((prev) => ({ ...prev, show: true }))}
			>
				<IcMFilter width={22} height={22} />
				{isFilterApplied ? (
					<div className={styles.applied_dot} />
				) : null}
			</div>
		</Popover>
	);
}
export default AdoptionFilter;
