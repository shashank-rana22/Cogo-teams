import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsOrganization, asyncFieldsOrganizationUsers, asyncFieldsShippingLines }
	from '@cogoport/forms/utils/getAsyncFields';
import { merge } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import airFields from './air-controls';
import fclCfsControls from './fcl-cfs';
import fclControl from './fcl-controls';
import fclLocals from './fcl-local-charges';
import freeDaysSection from './free-days-section';
import lclFields from './lcl-controls';

const Config = ({ service, serviceProviderId }) => {
	const [orgUsers, setOrgUsers] = useState([]);
	const serviceProviderOptions = useGetAsyncOptions(merge(asyncFieldsOrganization()));
	const shippingLineOptions = useGetAsyncOptions(merge(asyncFieldsShippingLines()));
	const units = {
		air_freight : 'per_kg_per_hour',
		lcl_freight : 'per_kg_per_day',
		fcl_freight : 'per_container',
	};

	const organizationUsersOptions = useGetAsyncOptions(
		merge(asyncFieldsOrganizationUsers()),
		{ params: { filters: { valueKey: 'organization_id' } } },
	);
	const getOptions = async () => {
		if (serviceProviderId) {
			const res = await organizationUsersOptions?.onHydrateValue([serviceProviderId]);
			setOrgUsers(res);
		}
	};

	useEffect(() => {
		if (serviceProviderId) {
			organizationUsersOptions?.onHydrateValue([serviceProviderId]);
		}
		getOptions();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [serviceProviderId]);

	const field = [];

	if (service?.service === 'fcl_freight') {
		field.push(...fclControl);

		if (service?.data?.include_destination_local) {
			field.push(fclLocals({ heading: 'Add Destination Local Charges' }));
		}

		if (service?.data?.include_origin_local) {
			field.push(fclLocals({ heading: 'Add Origin Local Charges' }));
		}

		if (service?.data?.free_days_detention_destination > 0) {
			field.push(...freeDaysSection({
				heading : 'Destination Detention Days',
				unit    : units[service?.service],
			}));
		}
	} else if (service?.service === 'fcl_cfs') {
		field.push(...fclCfsControls);
	} else if (service?.service === 'air_freight') {
		field.push({ ...airFields });
	} else if (service?.service === 'lcl_freight') {
		field.push({ ...lclFields });
		if (service?.data?.destination_storage_free_days > 0) {
			field.push(...freeDaysSection({
				heading : 'Origin Storage Days',
				unit    : units[service?.service],
			}));
		}
		if (service?.data?.origin_storage_free_days > 0) {
			field.push(...freeDaysSection({
				heading : 'Destination Storage Days',
				unit    : units[service?.service],
			}));
		}
	}

	const newField = field.map((control) => {
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

	return newField;
};

export default Config;
