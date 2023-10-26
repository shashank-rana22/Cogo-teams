import { Pill, Tooltip } from '@cogoport/components';
import { COMMODITY_NAME_MAPPING } from '@cogoport/globalization/constants/commodities';
import { isEmpty, startCase, upperCase } from '@cogoport/utils';

import getLoadArray from '../../../../../../../../SearchResults/utils/getLoadArray';

import styles from './styles.module.css';
import TruckShipments from './TruckShipments';

const ONE_COUNT = 1;

function LoadDetails({ data = {}, item = {} }) {
	const {
		container_size = '',
		containers_count = 0,
		container_type = '',
		total_quantity = 0,
		total_volume = 0,
		total_weight = 0,
		commodity = '',
		cargo_handling_type = '',
		packages_count = 0,
		weight = 0,
		volume = 0,
	} = data;

	return (
		<>
			{container_size ? (
				<Pill size="md" color="#F9F9F9">
					{container_size === '20' || container_size === '40'
						? `${container_size}ft`
						: container_size}
				</Pill>
			) : null}

			{containers_count ? (
				<Pill size="md" color="#F9F9F9">
					{`${containers_count} Container`}
				</Pill>
			) : null}

			{container_type ? (
				<Pill size="md" color="#F9F9F9">{startCase(container_type)}</Pill>
			) : null}

			{total_quantity ? (
				<Pill size="md" color="#F9F9F9">
					{`${total_quantity} ${total_quantity <= ONE_COUNT ? 'Package' : 'Packages'}`}
				</Pill>
			) : null}

			{packages_count ? (
				<Pill size="md" color="#F9F9F9">
					{`${packages_count} ${packages_count <= ONE_COUNT ? 'Package' : 'Packages'}`}
				</Pill>
			) : null}

			{total_volume ? (
				<Pill size="md" color="#F9F9F9">{`${total_volume} CBM`}</Pill>
			) : null}

			{volume ? (
				<Pill size="md" color="#F9F9F9">{`${volume} CBM`}</Pill>
			) : null}

			{total_weight ? (
				<Pill size="md" color="#F9F9F9">{`${total_weight} KG`}</Pill>
			) : null}

			{weight ? (
				<Pill size="md" color="#F9F9F9">{`${weight} KG`}</Pill>
			) : null}

			{(container_type || container_size || containers_count || total_volume || total_quantity
				|| weight || volume) && <br />}

			<Pill size="md" color="#F9F9F9">
				{COMMODITY_NAME_MAPPING[commodity]?.name || startCase(commodity) || 'All Commodities'}
			</Pill>

			{cargo_handling_type ? (
				<Pill size="md" color="#F9F9F9">{startCase(cargo_handling_type)}</Pill>
			) : null}

			{item?.inco_term ? (
				<Pill size="md" color="#FDEBE9">
					{`Inco: ${upperCase(item.inco_term)}`}
				</Pill>
			) : null}
		</>
	);
}

function ShipmentDetails({ item = {}, field = {} }) {
	const { shipment_type = '-', service_type = '-', service_details, services } = item || {};
	const { commodityKey = '' } = field || {};

	const isTruckType =	['ftl_freight', 'ltl_freight'].includes(shipment_type)
		|| ['ftl_freight', 'ltl_freight'].includes(service_type);

	const load = getLoadArray(service_type, service_details || services);

	if (
		['shipment_cargo_details', 'quotation_cargo_details', 'spot_search_cargo_details']
			.includes(commodityKey) && isTruckType
	) {
		return (
			<TruckShipments
				itemData={item}
				commodityKey={commodityKey}
				shipment_type={shipment_type}
			/>
		);
	}

	const firstLoadObject = load.shift();

	return (
		<div className={styles.container}>
			<LoadDetails data={firstLoadObject || {}} item={item} />

			{!isEmpty(load) ? (
				<Pill size="md" color="#E0E0E0">
					<Tooltip
						placement="top"
						content={(
							<div className={styles.content}>
								{load.map((loadItem) => (
									<LoadDetails
										key={loadItem?.id}
										data={loadItem || {}}
										item={item}
									/>
								))}
							</div>
						)}
					>
						{`+${load.length} more`}
					</Tooltip>
				</Pill>
			) : null}
		</div>

	);
}

export default ShipmentDetails;
