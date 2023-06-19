import { Button } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { useState } from 'react';

import Card from '../Card';

import Detail from './Detail';
import styles from './styles.module.css';

const LENGTH_CHECK = 1;

function ServiceProvider({
	tradePartnersData = {},
	setAddPoc = () => {},
	serviceProviders = {},
	rolesPermission = {},
}) {
	const [show, setShow] = useState({});
	const addPocPermission = !!rolesPermission?.can_add_service_provider_poc;

	const { service_provider_details:{ poc_data = [] } = {} } = tradePartnersData;

	const serviceProvidersLength = Object.keys(serviceProviders)?.length;

	return (
		Object.keys(serviceProviders).map((sp_key, index) => (
			<Card
				title={`Service Provider ${serviceProvidersLength <= LENGTH_CHECK ? '' : index + LENGTH_CHECK}`}
				key={serviceProviders[sp_key]?.id}
			>
				<div className={styles.header}>
					<div className={styles.service_provider_name}>{serviceProviders[sp_key]}</div>
					<div className={styles.row}>

						<Button
							themeType="linkUi"
							onClick={() => { setShow({ ...show, [sp_key]: !show[sp_key] }); }}
						>
							{show[sp_key] ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
						</Button>

						{addPocPermission ?	(
							<Button
								size="sm"
								onClick={() => setAddPoc({
									poc_type            : 'tradeParty',
									business_name       : serviceProviders[sp_key],
									trade_party_type    : 'service_provider',
									service_provider_id : sp_key,
								})}
								themeType="accent"
							>
								+ ADD POC
							</Button>
						) : null}

					</div>
				</div>

				{show[sp_key] && (<Detail data={poc_data} sp_key={sp_key} />)}

			</Card>
		))
	);
}
export default ServiceProvider;
