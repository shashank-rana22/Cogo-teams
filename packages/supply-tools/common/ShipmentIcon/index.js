import { IcMFtrailorFull } from '@cogoport/icons-react';

const ICON_MAPPING = {
	rail_domestic_freight: IcMFtrailorFull,
};

function ShipmentIcon({ height = 16, width = 16, shipment_type = '', ...rest }) {
	const Icon = ICON_MAPPING[shipment_type];

	if (!Icon) return null;

	return <Icon height={height} width={width} {...rest} />;
}

export default ShipmentIcon;
