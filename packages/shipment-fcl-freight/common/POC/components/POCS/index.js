import { Toggle } from '@cogoport/components';
import { useState } from 'react';

import useListStakeholders from '../../../../hooks/useListShipmentStakeholders';
import Card from '../Card';

import External from './External';
import Internal from './Internal';
import styles from './styles.module.css';

function POCS({ tradePartnersData = {}, setAddPoc = () => {}, shipment_id = '' }) {
	const [isInternal, setIsInternal] = useState(true);

	const { data:{ list:shipmentStakeholderData = [] } = {}, loading:stakeHolderLoading } = useListStakeholders({

		shipment_id,
	});

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
				/>
			) : <External tradePartnersData={tradePartnersData} setAddPoc={setAddPoc} />}
		</Card>
	);
}
export default POCS;
