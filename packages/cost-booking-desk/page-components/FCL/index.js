import List from '../../common/List';
import Loader from '../../common/Loader';
import Stepper from '../../common/Stepper';
import Tabs from '../../common/Tabs';
import CONFIGS from '../../config/CONTROLS_CONFIG.json';
import allTabs from '../../config/TABS_CONFIG.json';
import useListCostBookingDeskShipments from '../../hooks/useListCostBookingDeskShipments';

import styles from './styles.module.css';

const { fcl_freight: tabs } = allTabs;

function FclFreight({
	activeTab,
	setActiveTab,
}) {
	const { loading, data } = useListCostBookingDeskShipments({
		prefix: 'fcl_freight',
	});

	console.log('data', data);
	return (
		<>
			<div className={styles.header}>
				<div className={styles.stepper_container}>
					<Stepper
						options={CONFIGS.shipment_types}
					/>
				</div>
			</div>
			<Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

			<div
				className={`${styles.list_container} ${loading ? styles.loading : ''}`}
			>
				{loading ? (
					<Loader />
				) : (
					<List data={data} activeTab={activeTab} />
				)}
			</div>
		</>
	);
}
export default FclFreight;

// data={data}
// stateProps={stateProps}
// Card={Card}
// couldBeCardsCritical={couldBeCardsCritical}
