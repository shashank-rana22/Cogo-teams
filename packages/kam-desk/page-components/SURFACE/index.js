import { Toggle } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import AppliedFilters from '../../common/AppliedFilters';
import DeskTabs from '../../common/DeskTabs';
import Filters from '../../common/Filters';
import HeaderFilters from '../../common/HeaderFilters';
import Loader from '../../common/Loader';
import ShipmentType from '../../common/ShipmentType';
import StepperTabs from '../../common/StepperTabs';
import useListKamDeskSurfaceShipments from '../../hooks/useListKamDeskSurfaceShipments';

import ShipmentList from './ShipmentList';
import styles from './styles.module.css';

function Surface({ activeTab = '' }) {
	const router = useRouter();
	const { data, loading } = useListKamDeskSurfaceShipments();

	const handleOnchange = () => {
		const newUrl = `${window.location.origin}/${router?.query?.partner_id}/shipment-management`;
		window.sessionStorage.setItem('prev_nav', newUrl);
		window.location.href = newUrl;
	};

	return (
		<div>
			<div className={styles.header}>
				<ShipmentType />

				<HeaderFilters />
			</div>

			<div className={styles.stepper_container}>
				<StepperTabs />

				<div style={{ display: 'flex' }}>
					<Toggle
						offLabel="New"
						onLabel="Old"
						size="md"
						onChange={() => handleOnchange()}
						showOnOff
					/>
					<Filters />
				</div>
			</div>

			<AppliedFilters />

			<div className={styles.tabs_container}>
				<DeskTabs />
			</div>

			{loading
				? <Loader />
				: (
					<ShipmentList
						data={data}
						loading={loading}
						activeTab={activeTab}
					/>
				)}
		</div>
	);
}

export default Surface;
