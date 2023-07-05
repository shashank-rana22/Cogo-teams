import { dynamic } from '@cogoport/next';
import ScopeSelect from '@cogoport/scope-select';
import { useContext } from 'react';

import Search from '../../commons/Search';
import SegmentedTabs from '../../commons/SegmentedTabs';
import StepperTabs from '../../commons/StepperTabs';
import Tabs from '../../commons/Tabs';
import TABS_CONFIG from '../../config/TABS_CONFIG';
import BookingDeskContext from '../../context/BookingDeskContext';
import handleSegmentedTabChange from '../../helpers/handleSegmentedTabChange';
import handleStepperTabChange from '../../helpers/handleStepperTabChange';

import styles from './styles.module.css';

const RESOLVE_DESK = {
	export : dynamic(() => import('./Export-Import'), { ssr: false }),
	import : dynamic(() => import('./Export-Import'), { ssr: false }),
	local  : dynamic(() => import('./FCL-Local'), { ssr: false }),
	cfs    : dynamic(() => import('./FCL-CFS'), { ssr: false }),
	custom : dynamic(() => import('./FCL-Custom'), { ssr: false }),
};

const STEPPER_TAB_OPTIONS = Object.entries(TABS_CONFIG).map(([key, obj]) => ({
	label : obj.title,
	value : key,
}));

const SEGMENTED_TAB_OPTIONS = Object.entries(TABS_CONFIG.fcl_freight.segmented_tabs).map(([key, obj]) => ({
	title : obj.title,
	name  : key,
}));

export default function FclDesk() {
	const contextValues = useContext(BookingDeskContext);
	const { tabState: { stepperTab, segmentedTab }, scopeFilters } = contextValues || {};

	const { tabs } = TABS_CONFIG.fcl_freight.segmented_tabs[segmentedTab];

	const ResolvedList = RESOLVE_DESK[segmentedTab];

	return (
		<>
			<div className={styles.flex_row}>
				<div className={styles.stepper_container}>
					<StepperTabs
						options={STEPPER_TAB_OPTIONS}
						value={stepperTab}
						onChange={(v) => handleStepperTabChange({ ...contextValues, newStepperTab: v })}
					/>
				</div>

				<ScopeSelect size="md" defaultValues={scopeFilters} />
			</div>

			<div className={styles.flex_row}>
				<SegmentedTabs
					options={SEGMENTED_TAB_OPTIONS}
					value={segmentedTab}
					onChange={(v) => handleSegmentedTabChange({ ...contextValues, newSegmentedTab: v })}
				/>

				<div>
					<Search />
				</div>
			</div>

			<Tabs tabs={tabs} />

			{ResolvedList ? <ResolvedList tabs={tabs} /> : null}
		</>
	);
}
