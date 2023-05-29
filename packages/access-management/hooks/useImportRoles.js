import { asyncFieldsPartner, asyncFieldsPartnerRoles } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { useState } from 'react';

const useImportRoles = ({ onSubmit = () => {} }) => {
	const [formValues, setFormvalues] = useState({});
	const [view, setView] = useState('import'); // import/priority
	const [options, setOptions] = useState([]);

	const hashedOptions = {};
	(options || []).forEach((role) => {
		const hashedRole = {};
		(role.permissions || []).forEach((permission) => {
			hashedRole[`${permission.navigation}:${permission.resource_name}`] = permission;
		});

		hashedOptions[role.id] = hashedRole;
	});

	const handleSubmit = () => {
		if (view === 'import') {
			if (options.length > 1) {
				setView('priority');
			} else {
				const [firstRoleId] = formValues?.role_ids || [];
				const permissions =	options.find((role) => role.id === firstRoleId)?.permissions || [];

				onSubmit(permissions);
			}
		} else {
			const [firstRoleId, ...rest] = formValues?.role_ids || [];

			const permissions =	options.find((role) => role.id === firstRoleId)?.permissions || [];

			const takenPermissions = Object.keys(hashedOptions[firstRoleId]);

			rest.forEach((id) => {
				const hashedRole = hashedOptions[id] || {};
				const remainigPermissions = Object.keys(hashedRole).filter(
					(key) => !takenPermissions.includes(key),
				);

				const permissionsToTake = remainigPermissions.map(
					(item) => hashedRole[item],
				);

				permissions.push(...permissionsToTake);
				takenPermissions.push(...remainigPermissions);
			});

			onSubmit(permissions);
		}
	};

	let submitText = 'Import';
	if ((options || []).length > 1 && view === 'import') {
		submitText = 'Assign Priority';
	}

	const partnerOptions = useGetAsyncOptions({
		...asyncFieldsPartner(),
	});

	const partnerRoleOptions = useGetAsyncOptions({
		...asyncFieldsPartnerRoles(),
		initialCall : false,
		params      : {
			filters: {
				stakeholder_type : 'partner',
				stakeholder_id   : formValues?.partner_id,
			},
			page_limit: 10,
		},
	});

	return {
		handleSubmit,
		setFormvalues,
		setView,
		setOptions,
		formValues,
		submitText,
		view,
		partnerOptions,
		partnerRoleOptions,
		options,
	};
};

export default useImportRoles;
