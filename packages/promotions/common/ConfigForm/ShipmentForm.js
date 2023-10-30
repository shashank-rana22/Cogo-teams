import { useEffect } from 'react';

import Layout from '../Layout';

import getShipmentConfigControls from './controls/shipmentConfigControls';

const INCREMENT = 0.01;
const ZERO = 0;
const ONE = 1;

function ShipmentForm({
	control = {},
	errors = {},
	formValues = {},
	setValue = {},
}) {
	const { shipment_price_slab_config = [] } = formValues;

	useEffect(() => {
		shipment_price_slab_config?.forEach((_o, index) => {
			if (index === ZERO) {
				setValue(`shipment_price_slab_config.${index}.slab_lower_limit`, ONE);
			} else {
				setValue(
					`shipment_price_slab_config.${index}.slab_lower_limit`,
					Number(shipment_price_slab_config[index - ONE]?.slab_upper_limit) + INCREMENT,
				);
			}
			setValue(`shipment_price_slab_config.${index}.slab_unit`, 'shipment_value');
		});
	}, [shipment_price_slab_config, setValue]);

	const SHOW_ELEM = {};
	shipment_price_slab_config?.forEach((slab, index) => {
		SHOW_ELEM[`shipment_price_slab_config.${index}.max_allowed_discount_value`] = slab?.discount_limit_unit
		=== 'percentage';
	});

	return (
		<Layout
			controls={getShipmentConfigControls}
			control={control}
			errors={errors}
			formValues={formValues}
			showElements={SHOW_ELEM}
		/>
	);
}

export default ShipmentForm;
