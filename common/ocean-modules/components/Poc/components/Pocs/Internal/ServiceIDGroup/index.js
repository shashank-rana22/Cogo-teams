import { Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import Stakeholders from '../Stakeholders';

import styles from './styles.module.css';

const INDEX_0 = 0;

function ServiceIDGroup({ data = [], setAddPoc = () => {}, rolesPermission = {}, shipment_type = '' }) {
	const newData = data
		.filter((item) => item.service_id !== null)
		.map((item) => {
			const { service_id, ...rest } = item;
			return { service_id, ...rest };
		});

	const DATA_BY_SERVICE_ID = newData.reduce((acc, item) => {
		const { service_id, ...rest } = item;
		if (!acc[service_id]) {
			acc[service_id] = [];
		}
		acc[service_id].push({ service_id, ...rest });
		return acc;
	}, {});

	return (
		<div>

			{Object.keys(DATA_BY_SERVICE_ID).map((key) => (
				<div key={key}>
					<div>
						{ DATA_BY_SERVICE_ID[key][INDEX_0].cargo_details && (
							<div className={styles.pills_container}>
								<Pill size="sm" color="#f2f2f2">
									{startCase(DATA_BY_SERVICE_ID[key][INDEX_0].cargo_details.container_size)}
									ft
								</Pill>
								<Pill size="sm" color="#f2f2f2">
									{startCase(DATA_BY_SERVICE_ID[key][INDEX_0].cargo_details.commodity)}
								</Pill>
								<Pill size="sm" color="#f2f2f2">
									{startCase(DATA_BY_SERVICE_ID[key][INDEX_0].cargo_details.container_type)}

								</Pill>
								<Pill size="sm" color="#f2f2f2">
									{startCase(DATA_BY_SERVICE_ID[key][INDEX_0].cargo_details.containers_count)}
									&nbsp;
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
							shipment_type={shipment_type}
						/>
					</div>
				</div>
			))}

		</div>
	);
}

export default ServiceIDGroup;
