import { Toggle } from '@cogoport/components';
import ScopeSelect from '@cogoport/scope-select';
import { isEmpty } from '@cogoport/utils';

import Filters from '../../commons/Filters';
import RenderAppliedFilters from '../../commons/Filters/RenderAppliedFilters';
import List from '../../commons/List';
import Loader from '../../commons/Loader';
import Stepper from '../../commons/Stepper';
import Tabs from '../../commons/Tabs';
import CONFIGS from '../../config/CONTROLS_CONFIG.json';
import allTabs from '../../config/TABS_CONFIG.json';
import applyShipmentChangeFilter from '../../helpers/applyShipmentChangeFilter';
import useListBookingDeskShipments from '../../hooks/useListBookingDeskShipments';

import Card from './Card';
import styles from './styles.module.css';

const { fcl_freight: tabs } = allTabs;

export default function FCLDesk({ stateProps = {} }) {
	const { loading, data } = useListBookingDeskShipments({
		stateProps,
		prefix: 'fcl_freight',
	});

	const {
		handleVersionChange = () => {},
		filters,
		setFilters,
	} = stateProps || {};

	const couldBeCardsCritical = !!tabs.find(
		(tab) => tab.name === stateProps.activeTab,
	)?.isCriticalVisible;

	const appliedFilters = Object.entries(filters).filter(
		([key, val]) => !isEmpty(val) && !['page', 'q'].includes(key) && val !== false,
	);

	return (
		<>
			<div className={styles.header}>
				<div className={styles.stepper_container}>
					<Stepper
						options={CONFIGS.shipment_types}
						value={filters?.shipment_type}
						onChange={(v) => {
							applyShipmentChangeFilter({ shipment_type: v, stateProps });
						}}
					/>
				</div>

				<div className={styles.top_header_container}>
					<Filters stateProps={stateProps} />

					<div className={styles.version}>
						<Toggle
							size="md"
							onLabel="Old"
							offLabel="New"
							onChange={handleVersionChange}
						/>
					</div>

					<ScopeSelect size="md" defaultValues={stateProps.scopeFilters} />
				</div>
			</div>

			<div className={styles.render_filter_container}>
				{RenderAppliedFilters({ appliedFilters, setFilters })}
			</div>

			<Tabs tabs={tabs} stateProps={stateProps} />

			<div
				className={`${styles.list_container} ${loading ? styles.loading : ''}`}
			>
				{loading ? (
					<Loader />
				) : (
					<List
						data={data}
						stateProps={stateProps}
						Card={Card}
						couldBeCardsCritical={couldBeCardsCritical}
					/>
				)}
			</div>
		</>
	);
}
