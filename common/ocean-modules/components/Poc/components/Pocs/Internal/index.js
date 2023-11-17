import { Button, Loader } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { startCase } from '@cogoport/utils';
import { useContext } from 'react';

import getInternalPocData from '../../../helpers/getInternalPocData';
import getServiceStateMapping from '../../../helpers/getServiceStateMapping';

import ServiceIDGroup from './ServiceIDGroup';
import styles from './styles.module.css';

const ALLOWED_STAKEHOLDERS = ['admin', 'superadmin'];
const AWAITING_SERVICES_STATE = ['init', 'awaiting_service_provider_confirmation'];

function Internal({
	data = [], setAddPoc = () => { }, loading = false,
	rolesPermission = {}, shipment_data = {}, activeStakeholder = '',
}) {
	const { servicesList = [] } = useContext(ShipmentDetailContext);
	const internalData = getInternalPocData(data);
	const canAddPoc = !!rolesPermission?.add_internal_poc;

	const SERVICES_STATE_MAPPING = getServiceStateMapping(servicesList);

	return (
		<div>
			{loading ? <Loader /> : (
				<>
					<div className={styles.header}>
						<div className={styles.heading}>Internal : Cogoport</div>
						{canAddPoc ? (
							<Button
								size="sm"
								onClick={() => {
									setAddPoc({ poc_type: 'internal' });
								}}
								themeType="accent"
							>
								+ ADD POC
							</Button>
						) : null}
					</div>

					<div>
						{Object.keys(internalData).map((key) => (
							<div className={styles.service_container} key={key}>
								<div className={styles.service_name}>
									{startCase(key)}
								</div>

								{!AWAITING_SERVICES_STATE.includes(SERVICES_STATE_MAPPING[key])
								|| ALLOWED_STAKEHOLDERS.includes(activeStakeholder)
									? (
										<ServiceIDGroup
											data={internalData[key]}
											setAddPoc={setAddPoc}
											rolesPermission={rolesPermission}
											shipment_data={shipment_data}
											activeStakeholder={activeStakeholder}
										/>
									) : (
										<div className={styles.overlay}>
											<div className={styles.overlay_text}>
												Waiting for Service Confirmation to view POC&apos;s
											</div>
										</div>
									)}

							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
}

export default Internal;
