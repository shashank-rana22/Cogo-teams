import { asyncFieldsPartner, asyncFieldsPartnerRoles } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import useGetAsyncOptionsMicroservice from '@cogoport/forms/hooks/useGetAsyncOptionsMicroservice';
import { useAuthRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const FIRST_INDEX = 1;

const useImportRoles = ({ onSubmit = () => {} }) => {
	const { t } = useTranslation(['accessManagement']);
	const [formValues, setFormvalues] = useState({});
	const [view, setView] = useState('import'); // import/priority
	const [options, setOptions] = useState([]);

	const [{ loading: isImportingRole = false }, trigger] = useAuthRequest({
		url    : 'list_role_permissions',
		method : 'get',
	}, { manual: true });

	const handleSubmit = async () => {
		if (view === 'import') {
			if (options.length > FIRST_INDEX) {
				setView('priority');
			} else {
				const [firstRoleId] = formValues?.role_ids || [];
				const response = await trigger({
					params: {
						filters                       : { role_id: firstRoleId },
						all_role_permissions_required : true,
					},
				});

				onSubmit(((response.data || {}).list || []));
			}
		} else {
			const [firstRoleId, ...rest] = formValues?.role_ids || [];

			const response = await trigger({
				params: {
					filters                       : { role_id: formValues?.role_ids || [] },
					all_role_permissions_required : !isEmpty(formValues.role_ids),
				},
			});

			const permissionList = (response.data || {}).list || [];
			const firstRolePermissions = permissionList.filter((perm) => perm.role_id === firstRoleId);

			const takenPermissions = new Set(firstRolePermissions.map((perm) => {
				if (!isEmpty(perm.resource)) {
					return `${perm.navigation}-${perm.resource}`;
				}
				return perm.navigation;
			}));

			rest.forEach((id) => {
				const remainingPermissions = permissionList.filter(
					(perm) => {
						let isPermissionTaken = false;

						if (!isEmpty(perm.resource)) {
							isPermissionTaken = takenPermissions.has(`${perm.navigation}-${perm.resource}`);
						} else {
							isPermissionTaken = takenPermissions.has(perm.navigation);
						}

						return perm.role_id === id && !isPermissionTaken;
					},
				);

				firstRolePermissions.push(...remainingPermissions);

				remainingPermissions.forEach((perm) => {
					if (!isEmpty(perm.resource)) {
						takenPermissions.add(`${perm.navigation}-${perm.resource}`);
					} else {
						takenPermissions.add(perm.navigation);
					}
				});
			});

			onSubmit(firstRolePermissions);
		}
	};

	let submitText = t('accessManagement:roles_and_permission_permission_list_import_roles_select_import_button');
	if ((options || []).length > FIRST_INDEX && view === 'import') {
		submitText = t('accessManagement:roles_and_permission_permission_list_import_roles_select_assign_priority');
	}

	const partnerOptions = useGetAsyncOptions({
		...asyncFieldsPartner(),
	});

	const partnerRoleOptions = useGetAsyncOptionsMicroservice({
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
		isImportingRole,
		view,
		partnerOptions,
		partnerRoleOptions,
		options,
	};
};

export default useImportRoles;
