import { useForm } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import getField from '../configurations/index';

import useGetChargeCodes from './useGetChargeCodes';

const useUpdateSpotNegotiationRate = ({ service }) => {
	const [selectedCodes, setSelectedCodes] = useState({});
	const { control, watch, register } = useForm();
	const { list } = useGetChargeCodes({ service_name: `${service?.service}_charges` });
	const values = watch();
	const showElements = { sourced_by_id: !values?.service_provider_id };
	const fields = getField({ service, serviceProviderId: values?.service_provider_id });

	const genericLineitems = watch('line_items');

	useEffect(() => {
		if (list?.length) {
			const chargeCodesObj = {};
			list.forEach((chrg) => {
				chargeCodesObj[chrg.code] = chrg;
			});
			setSelectedCodes({ ...chargeCodesObj });
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(list)]);
	fields.forEach((ctrl) => {
		if (ctrl.controls) {
			const chargeCode = genericLineitems;
			ctrl.controls.forEach((childCtrl) => {
				if (childCtrl.name === 'unit') {
					const unitOptions = {};
					chargeCode?.forEach((item, i) => {
						const chargeCodes = {};
						chargeCodes[item.code] = selectedCodes[item.code];
						unitOptions[i] = (
							chargeCodes[item.code]?.units || ['per_bl']
						).map((unit) => ({
							label : startCase(unit),
							value : unit,
						}));
					});
					// eslint-disable-next-line no-param-reassign
					childCtrl.customProps = unitOptions;
				}
				if (childCtrl.name === 'code') {
					// eslint-disable-next-line no-param-reassign
					childCtrl.options = list;
				}
			});
		}
	});

	return {
		fields,
		control,
		showElements,
		register,
	};
};
export default useUpdateSpotNegotiationRate;
