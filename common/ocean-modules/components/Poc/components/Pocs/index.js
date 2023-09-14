import { Toggle } from '@cogoport/components';
import { useState } from 'react';

import Card from '../Card';

import External from './External';
import Internal from './Internal';
import styles from './styles.module.css';

function Pocs({
	tradePartnersData = {},
	setAddPoc = () => {},
	shipmentStakeholderData = [],
	stakeHolderLoading = false,
	servicesList = [],
	shipment_data = {},
	rolesPermission = {},
	activeStakeholder = '',
}) {
	const [isInternal, setIsInternal] = useState(true);

	return (
		<Card title="POCs">
			<div className={styles.toggle_container}>
				<Toggle
					offLabel="Internal"
					onLabel="External"
					size="sm"
					onChange={() => setIsInternal(!isInternal)}
					showOnOff
					value={isInternal}
				/>
			</div>

			{isInternal ? (
				<Internal
					data={shipmentStakeholderData?.length ? shipmentStakeholderData : []}
					setAddPoc={setAddPoc}
					loading={stakeHolderLoading}
					servicesList={servicesList}
					shipment_data={shipment_data}
					rolesPermission={rolesPermission}
					activeStakeholder={activeStakeholder}
				/>
			) : (
				<External
					tradePartnersData={tradePartnersData}
					setAddPoc={setAddPoc}
					rolesPermission={rolesPermission}
					activeStakeholder={activeStakeholder}
				/>
			)}
		</Card>
	);
}
export default Pocs;
