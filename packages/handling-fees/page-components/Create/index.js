import { Button, TabPanel, Tabs } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useEffect, useState } from 'react';

import Layout from '../../common/Layout';
import SLAB_UNIT_MAPPING from '../../configs/SLAB_UNIT_MAPPING.json';
import handleFieldArrayAddCheck from '../../helpers/checkFeeConfiguration';
import SERVICE_TABS_MAPPING from '../../utils/service-tabs-mapping';

import getMandatoryControls from './getMandatoryControls';

const ZERO = 0;
const ONE = 1;

const BOOKING_SOURCES_WITH_RATE_TYPES = [
	'spot_search',
	'spot_booking',
	'shipment_rollover',
	'quotation',
	'quick_checkout',
];

function Create({ data = {} }) {
	const [activeService, setActiveService] = useState('fcl_freight');

	const mandatoryControls = getMandatoryControls({
		activeService,
		data,
		control_name         : 'slab_details',
		isAddFieldArrayCheck : true,
	});

	const { control, formState:{ errors = {} } = {}, watch, reset, setValue, handleSubmit } = useForm({
		defaultValues: {},
	});

	const formValues = watch();

	// const defaultFeeUnit = formValues?.slab_details?.[GLOBAL_CONSTANTS.zeroth_index]?.fee_unit;

	const { slab_details = [], booking_source = '' } = formValues;

	const customFieldArrayControls = { alternate_slab_details: {}, slab_details: {} };

	slab_details?.forEach((_o, index) => {
		customFieldArrayControls.slab_details[GLOBAL_CONSTANTS.zeroth_index] = {
			slab_lower_limit: { disabled: true },
		};

		if (index > ZERO) {
			customFieldArrayControls.slab_details[index] = {
				slab_unit        : { disabled: true },
				slab_lower_limit : { disabled: true },
				fee_unit         : { disabled: true },
				fee_currency     : { disabled: true },
			};
		}
	});
	useEffect(() => {
		setValue('slab_details.0.slab_lower_limit', 1);
		slab_details?.forEach((_o, index) => {
			setValue(
				`slab_details.${index}.slab_unit`,
				SLAB_UNIT_MAPPING[activeService][GLOBAL_CONSTANTS.zeroth_index]?.value,
			);
			if (index > ZERO) {
				setValue(`slab_details.${index}.slab_unit`, slab_details[index - ONE].slab_unit);
				setValue(`slab_details.${index}.slab_lower_limit`, slab_details[index - ONE].slab_upper_limit + ONE);
				setValue(`slab_details.${index}.fee_unit`, slab_details[index - ONE].fee_unit);
				setValue(`slab_details.${index}.fee_currency`, slab_details[index - ONE].fee_currency);
			}
		});
	}, [slab_details, setValue, activeService]);

	const showElements = {
		rate_source: BOOKING_SOURCES_WITH_RATE_TYPES.includes(booking_source),
	};

	const onSubmit = (val) => {
		console.log('val:: ', val);
	};

	useEffect(() => {
		reset();
	}, [activeService, reset]);

	return (
		<>
			<h2>Create Handling fees Configuration</h2>
			<Tabs
				themeType="primary"
				activeTab={activeService}
				onChange={(val) => {
					setActiveService(val);
				}}
			>
				{(SERVICE_TABS_MAPPING).map((item) => {
					const { label = '', value = '' } = item;
					return 	<TabPanel themeType="primary" key={value} name={value} title={label} />;
				})}
			</Tabs>

			<Layout
				control={control}
				controls={mandatoryControls}
				errors={errors}
				handleFieldArrayAddCheck={handleFieldArrayAddCheck}
				customFieldArrayControls={customFieldArrayControls}
				formValues={formValues}
				showElements={showElements}
			/>

			<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
				<Button size="lg" onClick={handleSubmit(onSubmit)}>
					SUBMIT
				</Button>
			</div>
		</>
	);
}

export default Create;
