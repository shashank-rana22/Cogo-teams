import { useRef, useEffect, useState } from 'react';

import Charge from './charge';
import styles from './styles.module.css';

function AddAdditionalRates({
	data = {},
	payload = {},
	additionalService = undefined,
	dependentMainFreight = [], filter = {},
	source = '',
	triggeredFrom = '',
}) {
	const reference = useRef(null);
	const serviceType = filter?.service;
	const charges = {
		fcl_freight : ['export:fcl_freight_local', 'import:fcl_freight_local'],
		air_freight : [
			'export:air_freight_local',
			'import:air_freight_local',
			'add_surcharge',
		],
		lcl_freight: [],
	};
	const [additionalCharge, setAdditionalCharge] = useState(false);
	const [chargeAdded, setChargeAdded] = useState([]);

	Object.keys(additionalService || {}).forEach((service) => {
		if (
			![
				'fcl_freight_local',
				'air_freight_local',
				'fcl_freight',
				'air_freight',
				'lcl_freight',
			].includes(additionalService[service]?.service_type)
			&& !charges[serviceType].includes(
				`${additionalService[service].trade_type}:${additionalService[service]?.service_type}`,
			)
		) {
			const newService = `${additionalService[service].trade_type}:${additionalService[service]?.service_type}`;
			charges[serviceType].push(newService);
		}
	});

	useEffect(() => {
		if (reference?.current) {
			reference?.current?.scrollTop({
				block    : 'start',
				inline   : 'nearest',
				behavior : 'smooth',
			});
		}
	}, [additionalCharge]);

	return (
		<div>
			{(dependentMainFreight || []).map((service) => {
				const containerDetails = service?.service === 'main_freight'
					? {
						container_size : data?.container_size,
						container_type : data?.container_type,
						commodity      : data?.commodity,
					}
					: {
						container_size : service?.container_size,
						container_type : service?.container_type,
						commodity      : service?.commodity,
					};
				const message = containerDetails?.container_size
					? `Add Rates For  :- ${containerDetails?.container_size},
						 ${containerDetails?.container_type}, ${containerDetails?.commodity} First.`
					: 'Add Rates For Main Freight First';
				return (
					<div className={styles.addtional_container} key={service?.service}>
						<h4 style={{ margin: '10px 26px 0' }}>
							{containerDetails?.container_size
								? `Add Additional Rates For : ${containerDetails?.container_size},
								${containerDetails?.container_type},
								${containerDetails?.commodity}`
								: 'Add Additional Rates'}
						</h4>
						{(charges[serviceType] || []).map((charge) => (
							<Charge
								key={charge}
								additionalCharge={additionalCharge}
								setAdditionalCharge={setAdditionalCharge}
								charge={charge}
								payload={payload}
								additionalService={additionalService}
								chargeAdded={chargeAdded}
								setChargeAdded={setChargeAdded}
								message={message}
								containerDetails={containerDetails}
								ref={additionalCharge === charge ? reference : null}
								filter={filter}
								data={data}
								source={source}
								triggeredFrom={triggeredFrom}
							/>
						))}
					</div>
				);
			})}
		</div>

	);
}
export default AddAdditionalRates;
