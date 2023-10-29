import { Button, TabPanel, Tabs } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useEffect, useState } from 'react';

import Layout from '../../common/Layout';
import handleFieldArrayAddCheck from '../../helpers/checkFeeConfiguration';
import useCreateHandlingFeeConfig from '../../hooks/useCreateHandlingFeeConfig';
import SERVICE_TABS_MAPPING from '../../utils/service-tabs-mapping';

import CustomConfig from './CustomConfig';
import getMandatoryControls from './getMandatoryControls';
import getOptionalControls from './getOptionalControls';

const ZERO = 0;

const BOOKING_SOURCES_WITH_RATE_TYPES = [
	'spot_search',
	'spot_booking',
	'shipment_rollover',
	'quotation',
	'quick_checkout',
];

function Create({ data = {}, type = 'create' }) {
	const router = useRouter();

	const [activeService, setActiveService] = useState('fcl_freight');

	const { onCreate = () => {} } = useCreateHandlingFeeConfig({ activeService, data, type });

	const { control, formState:{ errors = {} } = {}, watch, setValue, handleSubmit } = useForm({
		defaultValues: {},
	});

	const formValues = watch();

	const mandatoryControls = getMandatoryControls({
		activeService,
		data,
		control_name         : 'slab_details',
		isAddFieldArrayCheck : true,
	});

	const optionalControls = getOptionalControls({ activeService, data, formValues, setValue });

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

	const showElements = {
		rate_source: BOOKING_SOURCES_WITH_RATE_TYPES.includes(booking_source),
	};

	useEffect(() => {
		setValue('slab_details.0.slab_lower_limit', 1);
	}, [slab_details, setValue, activeService]);

	useEffect(() => {
		setValue('slab_details', data?.data?.slab_details);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data?.data?.slab_details]);

	return (
		<>

			<div style={{ display: 'flex', alignItems: 'center' }}>
				<Button
					themeType="tertiary"
					onClick={() => {
						router.push('/handling-fees');
					}}
				>
					<IcMArrowBack height={20} width={20} fill="#221f20" />
				</Button>
				<div style={{ fontSize: '20px', fontWeight: '600' }}>Create Handling fees Configuration</div>
			</div>

			{type === 'create' ? (
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
			) : null}

			<Layout
				control={control}
				controls={optionalControls}
				errors={errors}
				handleFieldArrayAddCheck={handleFieldArrayAddCheck}
				customFieldArrayControls={customFieldArrayControls}
				formValues={formValues}
				showElements={showElements}
				setValue={setValue}
			/>

			<Layout
				control={control}
				controls={mandatoryControls}
				errors={errors}
				handleFieldArrayAddCheck={handleFieldArrayAddCheck}
				customFieldArrayControls={customFieldArrayControls}
				formValues={formValues}
				showElements={showElements}
				setValue={setValue}
			/>

			<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
				<Button size="lg" onClick={handleSubmit(onCreate)}>
					SUBMIT
				</Button>
			</div>

			{type === 'edit' ? (
				<CustomConfig />
			) : null}
		</>
	);
}

export default Create;
