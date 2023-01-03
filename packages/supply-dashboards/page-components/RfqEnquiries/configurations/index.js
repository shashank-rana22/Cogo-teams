import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsOrganization, asyncFieldsOrganizationUsers } from '@cogoport/forms/utils/getAsyncFields';
import { merge } from '@cogoport/utils';
import { useEffect } from 'react';

import fclControl from './fcl-controls';
import fclDetetionFreeDays from './fcl-detetion-free-days';
import fclLocals from './fcl-local-charges';

const Config = ({ service, serviceProviderId }) => {
	const serviceProviderOptions = useGetAsyncOptions(merge(asyncFieldsOrganization()));

	const organizationUsersOptions = useGetAsyncOptions(
		merge(asyncFieldsOrganizationUsers()),
		{ params: { filters: { valueKey: 'organization_id' } } },
	);

	useEffect(() => {
		if (serviceProviderId) {
			organizationUsersOptions?.onHydrateValue([serviceProviderId]);
		}
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
			field.push(...fclDetetionFreeDays({ heading: 'Destination Detention Days' }));
		}
	}
	const newField = field.map((control) => {
		const { name } = control;
		let newControl = { ...control };
		if (name === 'service_provider_id') {
			newControl = { ...newControl, ...serviceProviderOptions };
		} else if (name === 'sourced_by_id') {
			newControl = { ...newControl, ...organizationUsersOptions };
		}
		return { ...newControl };
	});
	return newField;
};

export default Config;
