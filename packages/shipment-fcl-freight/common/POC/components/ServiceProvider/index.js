import { Button } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { useState } from 'react';

import useListShipmentServices from '../../../../hooks/useListShipmentServices';
import getServiceProviderData from '../../helpers/getServiceProviderData';
import Card from '../Card';

import Detail from './Detail';
import styles from './styles.module.css';

function ServiceProvider({ tradePartnersData = {} }) {
	const [show, setShow] = useState({});
	const { data } = useListShipmentServices({
		shipment_id    : '89909e8a-f8fe-4d69-a9b5-eda9197dfb1a',
		defaultFilters : { status: ['active', 'pending', 'inactive'] },
		defaultParams  : {
			service_stakeholder_required   : true,
			collection_party_data_required : true,
		},
	});

	const { service_provider_details:{ poc_data = [] } = {} } = tradePartnersData;

	const service_providers = getServiceProviderData(data);

	const serviceProvidersLength = Object.keys(service_providers)?.length;

	return (
		Object.keys(service_providers).map((sp_key, index) => (
			<Card title={`Service Provider ${serviceProvidersLength <= 1 ? '' : index + 1}`}>
				<div className={styles.header}>
					<div className={styles.service_provider_name}>{service_providers[sp_key]}</div>
					<div className={styles.row}>
						<div><Button size="sm">+ ADD POC</Button></div>
						<div>
							<Button
								themeType="linkUi"
								onClick={() => { setShow({ ...show, [sp_key]: !show[sp_key] }); }}
							>
								{show[sp_key] ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
							</Button>

						</div>
					</div>
				</div>
				{show[sp_key] ? (
					<Detail data={poc_data} sp_key={sp_key} />
				) : null}

			</Card>
		))
	);
}
export default ServiceProvider;
