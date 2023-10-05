import { useContext } from 'react';

import AppliedFilters from '../../common/AppliedFilters';
import CriticalAndSearch from '../../common/CriticalAndSearch';
import DeskTabs from '../../common/DeskTabs';
import Filters from '../../common/Filters';
import Stepper from '../../common/Stepper';
import StepperTabs from '../../common/StepperTabs';
import CostBookingDeskContext from '../../context/CostBookingDeskContext';

import PurchaseList from './PurchaseList';
import ShipmentList from './ShipmentList';
import styles from './styles.module.css';

const SECURITY_DEPOSIT_TAB = 'security_deposit';

function FclFreight() {
	const { activeTab } = useContext(CostBookingDeskContext);

	return (
		<div>
			<div className={styles.header}>
				<div className={styles.stepper_container}>
					<Stepper />
				</div>

				{activeTab !== SECURITY_DEPOSIT_TAB ? <Filters /> : null}

			</div>

			{activeTab !== SECURITY_DEPOSIT_TAB ? <AppliedFilters /> : null}

			<div className={styles.search_and_tab}>
				<StepperTabs />

				{activeTab !== SECURITY_DEPOSIT_TAB ? <CriticalAndSearch /> : null}
			</div>

			<div className={styles.desk_tabs}>
				<DeskTabs />
			</div>

			{activeTab === SECURITY_DEPOSIT_TAB ? <PurchaseList /> : <ShipmentList />}
		</div>
	);
}
export default FclFreight;
