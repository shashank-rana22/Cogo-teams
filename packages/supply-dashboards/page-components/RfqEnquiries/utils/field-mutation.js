import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsOrganization, asyncFieldsOrganizationUsers, asyncFieldsShippingLines }
	from '@cogoport/forms/utils/getAsyncFields';
import { merge, startCase } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import useGetChargeCodes from '../hooks/useGetChargeCodes';

const FieldMutation = ({ fields, values, service }) => {
	const [selectedCodes, setSelectedCodes] = useState({});
	const { list } = useGetChargeCodes({ service_name: `${service?.service}_charges` });
	const [orgUsers, setOrgUsers] = useState([]);
	const serviceProviderOptions = useGetAsyncOptions(merge(asyncFieldsOrganization()));
	const shippingLineOptions = useGetAsyncOptions(merge(asyncFieldsShippingLines()));
	const organizationUsersOptions = useGetAsyncOptions(
		merge(asyncFieldsOrganizationUsers()),
		{ params: { filters: { valueKey: 'organization_id' } } },
	);

	const serviceProviderId = values?.service_provider_id;
	const getOptions = async () => {
		if (serviceProviderId) {
			const res = await organizationUsersOptions?.onHydrateValue([serviceProviderId]);
			setOrgUsers(res);
		}
	};

	useEffect(() => {
		getOptions();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [serviceProviderId]);

	const newField = fields.map((control) => {
		const { name } = control;
		let newControl = { ...control };
		if (name === 'service_provider_id') {
			newControl = { ...newControl, ...serviceProviderOptions };
		} else if (name === 'sourced_by_id') {
			newControl = { ...newControl, ...organizationUsersOptions, options: orgUsers };
		} else if (name === 'shipping_line_id') {
			newControl = { ...newControl, ...shippingLineOptions };
		}
		return { ...newControl };
	});

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

	const genericLineitems = values?.line_items;

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
							chargeCodes[item.code]?.units || ['per_container']
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

	return { newField };
};

export default FieldMutation;
