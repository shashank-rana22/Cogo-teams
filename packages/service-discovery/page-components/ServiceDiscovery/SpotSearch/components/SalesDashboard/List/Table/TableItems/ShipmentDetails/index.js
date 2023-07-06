import { Pill, Tooltip } from '@cogoport/components';
import { isEmpty, startCase, upperCase } from '@cogoport/utils';

import getLoadArray from '../../../../../../../../SearchResults/utils/getLoadArray';

import RenderTruckShipments from './renderTruckShipments';
import styles from './styles.module.css';

const renderShipment = (itemData, field) => {
	const { shipment_type = '-', service_type = '-', service_details, services } = itemData || {};
	const { commodityKey = '' } = field || {};

	const isTruckType =	['ftl_freight', 'ltl_freight'].includes(shipment_type)
		|| ['ftl_freight', 'ltl_freight'].includes(service_type);

	const load = getLoadArray(service_type, service_details || services);

	if (
		['shipment_cargo_details', 'quotation_cargo_details', 'spot_search_cargo_details']
			.includes(commodityKey) && isTruckType
	) {
		return (
			<RenderTruckShipments
				itemData={itemData}
				commodityKey={commodityKey}
				shipment_type={shipment_type}
			/>
		);
	}

	const firstLoadObject = load.shift();

	const renderLoadDetails = (data) => (
		(
			<>
				{data?.container_size ? (
					<Pill size="md" color="#F9F9F9">
						{data.container_size === '20' || data.container_size === '40'
							? `${data.container_size}ft`
							: data.container_size}
					</Pill>
				) : null}

				{data.containers_count > 0 ? (
					<Pill size="md" color="#F9F9F9">
						{`${data.containers_count} Container`}
					</Pill>
				) : null}

				{data.container_type ? (
					<Pill size="md" color="#F9F9F9">{startCase(data.container_type)}</Pill>
				) : null}

				{(startCase(data.container_type)
								|| data.container_size
								|| data.containers_count) && <br />}

				<Pill size="md" color="#F9F9F9">
					{startCase(data.commodity) || 'All Commodities'}
				</Pill>

				{itemData?.inco_term ? (
					<Pill size="md" color="#FDEBE9">
						{`Inco: ${upperCase(itemData.inco_term)}`}
					</Pill>
				) : null}
			</>
		)
	);

	return (

		<div className={styles.container}>

			{renderLoadDetails(firstLoadObject)}

			{!isEmpty(load) ? (
				<Pill size="md" color="#F9F9F9">
					<Tooltip
						placement="top"
						content={(
							<div className={styles.content}>
								{load.map((loadItem) => renderLoadDetails(loadItem))}
							</div>
						)}
					>
						{`+${load.length} more`}
					</Tooltip>
				</Pill>
			) : null}
		</div>

	);
};

export default renderShipment;
