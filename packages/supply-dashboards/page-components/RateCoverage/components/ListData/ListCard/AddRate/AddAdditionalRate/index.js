import { useRef, useEffect, useState } from 'react';

import Charge from './charge';
import styles from './styles.module.css';

function AddAdditionalRates({
	showAddRate,
	payload,
	additionalService = undefined,
	dependentMainFreight = [],
}) {
	const reference = useRef(null);
	const serviceType = showAddRate?.service_type;
	const charges = {
		fcl_freight : ['export:fcl_freight_local', 'import:fcl_freight_local'],
		air_freight : [
			'export:air_freight_local',
			'import:air_freight_local',
			'add_surcharge',
		],
		lcl_freight: [],
	};
	const [additionalCharge, setAdditionalCharge] = useState();
	const [chargeAdded, setChargeAdded] = useState([]);

	Object.keys(additionalService || {}).forEach((service) => {
		if (
			![
				'fcl_freight_local',
				'air_freight_local',
				'fcl_freight',
				'air_freight',
				'lcl_freight',
			].includes(additionalService[service].service_type)
			&& !charges[serviceType].includes(
				`${additionalService[service].trade_type}:${additionalService[service].service_type}`,
			)
		) {
			const newService = `${additionalService[service].trade_type}:${additionalService[service].service_type}`;
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
			<div>
				{(dependentMainFreight || []).map((service) => {
					const requiredPayload =	service?.service === 'main_freight'
						? payload?.[showAddRate?.id || showAddRate?.user_id]
						: payload?.[service?.id];

					const containerDetails = service?.service === 'main_freight'
						? {
							container_size : showAddRate?.container_size,
							container_type : showAddRate?.container_type,
							commodity      : showAddRate?.commodity,
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
							<h4>
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
									payload={requiredPayload}
									additionalService={additionalService}
									chargeAdded={chargeAdded}
									setChargeAdded={setChargeAdded}
									message={message}
									containerDetails={containerDetails}
									ref={additionalCharge === charge ? reference : null}
								/>
							))}
						</div>
					);
				})}
			</div>
		</div>
	);
}
export default AddAdditionalRates;
