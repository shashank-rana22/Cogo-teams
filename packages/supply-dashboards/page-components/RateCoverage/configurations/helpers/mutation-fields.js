/* eslint-disable custom-eslint/function-name-check */
import { asyncFieldsOrganizationUsers, useGetAsyncOptions } from '@cogoport/forms';
import { merge } from '@cogoport/utils';

function FieldMutation({ fields, values }) {
	const organizationUsers = useGetAsyncOptions(
		merge(
			asyncFieldsOrganizationUsers(),
			{ params: { filters: { organization_id: values?.service_provider_id } } },
		),
	);
	const finalFields = (fields || []).map((control) => {
		const { name } = control;
		let newControl = { ...control };
		if (name === 'sourced_by_id') {
			newControl = { ...newControl, ...organizationUsers };
		}

		return { ...newControl };
	});

	return {
		finalFields,
	};
}
export default FieldMutation;
