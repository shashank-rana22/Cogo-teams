import { Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';

import Stakeholders from '../Stakeholders';

import styles from './styles.module.css';

function ServiceIDGroup({
	data = [], setAddPoc = () => {}, rolesPermission = {},
	shipment_data = {}, activeStakeholder = '',
}) {
	const DATA_BY_SERVICE_ID = (data || []).reduce((acc, item) => {
		const { service_id, ...rest } = item;
		if (!acc[service_id]) {
			acc[service_id] = [];
		}
		acc[service_id].push({ service_id, ...rest });
		return acc;
	}, {});

	return (
		<div>

			{Object.keys(DATA_BY_SERVICE_ID).map((key) => {
				const currentData = DATA_BY_SERVICE_ID[key]?.[GLOBAL_CONSTANTS.zeroth_index];

				return (
					<div key={key}>
						<div>
							{currentData.cargo_details && (
								<div className={styles.pills_container}>
									<Pill size="sm" color="#f2f2f2">
										{startCase(currentData.cargo_details.container_size)}
										ft
									</Pill>
									<Pill size="sm" color="#f2f2f2">
										{startCase(currentData.cargo_details.commodity)}
									</Pill>
									<Pill size="sm" color="#f2f2f2">
										{startCase(currentData.cargo_details.container_type)}

									</Pill>
									<Pill size="sm" color="#f2f2f2">
										{startCase(currentData.cargo_details.containers_count)}
										{' '}
										Containers
									</Pill>
								</div>
							)}
						</div>

						<div>
							<Stakeholders
								data={DATA_BY_SERVICE_ID[key]}
								setAddPoc={setAddPoc}
								rolesPermission={rolesPermission}
								shipment_data={shipment_data}
								activeStakeholder={activeStakeholder}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default ServiceIDGroup;
