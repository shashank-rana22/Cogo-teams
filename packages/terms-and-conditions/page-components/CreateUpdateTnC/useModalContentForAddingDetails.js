import { asyncFieldsOperators, asyncFieldsLocations, useForm } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { useMemo } from 'react';

import getShowElements from '../../utlis/getShowElements';
import getOptions from '../../utlis/service-to-trade-type-mappings';

import getTncControls from './controls';
import CONTROLS_FORM_TYPE_MAPPING from './formTypesControls.json';

const useModalContentForAddingDetails = (props) => {
	const { action, tncLevel, editFormValue } = props;

	const controls = getTncControls({ values: editFormValue });
	const {
		handleSubmit, control, formProps, formState: { errors },
		watch,
	} = useForm();

	const shippingLineOptions = useGetAsyncOptions({
		...asyncFieldsOperators(),
		initialCall : true,
		params      : {
			filters: {
				operator_type: 'shipping_line',

			},
		},
	});
	const airLineOptions = useGetAsyncOptions({
		...asyncFieldsOperators(),
		initialCall : true,
		params      : {
			filters: {
				operator_type: 'airline',

			},
		},
	});
	const locationOptions = useGetAsyncOptions({
		...asyncFieldsLocations(),

	});

	const watchShippingLineId = watch('shipping_line_id');
	const watchCountry = watch('country');
	const watchAirlineId = watch('airline_id');
	const watchTradeType = watch('trade_type');
	const watchService = watch('service');
	const watchPayingPartyCountry = watch('paying_party_country_ids');
	const watchDescription = watch('description');

	const filteredControls = useMemo(() => {
		const controlNames = CONTROLS_FORM_TYPE_MAPPING[tncLevel] || [];

		return controls.filter((controlss) => controlNames.includes(controlss.name));
	}, [tncLevel]);

	const newControl = filteredControls.map((field) => {
		const { name } = field;
		let newField = { ...field };
		if (name === 'shipping_line_id') {
			newField = { ...newField, ...shippingLineOptions };
		}
		if (name === 'airline_id') {
			newField = { ...newField, ...airLineOptions };
		}
		if (name === 'country_id') {
			newField = {
				...newField,
				...locationOptions,
				label:
				(watchTradeType === 'import' && 'Import To')
				|| (watchTradeType === 'export' && 'Export From')
				|| 'Country',
			};
		}
		if (name === 'paying_party_country_ids') {
			newField = { ...newField, ...locationOptions };
		}
		if (name === 'trade_type') {
			newField = {
				...newField,
				options: getOptions[watchService],
			};
		}
		return { ...newField };
	});

	const showElements = getShowElements({ service: watchService, trade_type: watchTradeType, controls });

	return {
		// filteredControls,
		control,
		formProps: { ...formProps, handleSubmit, fields: newControl, formState: { errors } },
		showElements,
		newControl,
	};
};

export default useModalContentForAddingDetails;
