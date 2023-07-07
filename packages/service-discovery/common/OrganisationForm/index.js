import { Select, Toast } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMManufacturing, IcMProfile } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import React, { useMemo, useEffect, useCallback } from 'react';

import CustomSelectOption from '../CustomSelectOption';

import styles from './styles.module.css';

function OrganisationForm({
	organization = {},
	setOrganization = () => {},
	errors,
	...rest
}) {
	const ORG_PARAMS = {
		branches_data_required : true,
		filters                : {
			status       : 'active',
			account_type : 'importer_exporter',
		},
	};

	const USER_PARAMS = useMemo(() => (
		{
			filters: {
				status                 : 'active',
				organization_id        : organization?.organization_id,
				organization_branch_id : organization?.organization_branch_id,
			},
		}
	), [organization?.organization_branch_id, organization?.organization_id]);

	const [{ loading, data: userData }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_organization_users',
	}, { manual: true });

	const fetchUsers = useCallback(async () => {
		try {
			await trigger({
				params: USER_PARAMS,
			});
		} catch (error) {
			if (error.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	}, [USER_PARAMS, trigger]);

	const renderOrgLabel = (data) => CustomSelectOption({ data, key: 'organizations' });

	const handleOrgChange = (val, obj = {}) => {
		const {
			id = '',
			organization_branch_ids = '',
			business_name = '',
		} = obj;

		setOrganization({
			organization_id        : id,
			organization_branch_id : organization_branch_ids?.[GLOBAL_CONSTANTS.zeroth_index],
			business_name,
			user_id                : undefined,
		});
	};

	const handleUserChange = (val) => {
		setOrganization((prev) => ({
			...prev,
			user_id: val,
		}));
	};

	const userOptions = useMemo(() => {
		const { list = [] } = userData || {};

		const finalOptions = list.map((item) => ({
			label : item.name,
			value : item.user_id,
		}));

		return finalOptions;
	}, [userData]);

	useEffect(() => {
		if (!organization?.organization_id) {
			return;
		}
		fetchUsers();
	}, [fetchUsers, organization?.organization_id]);

	useEffect(() => {
		setOrganization((prev) => ({
			...prev,
			user_id: userOptions?.[GLOBAL_CONSTANTS.zeroth_index]?.value,
		}));
	}, [setOrganization, userOptions]);

	return (
		<div className={styles.container} style={rest.style}>
			<div className={styles.form_item}>
				<div className={styles.label}>
					Select an organisation
					{' '}
					<div className={styles.required_mark}>*</div>
				</div>

				<AsyncSelect
					name="organization_id"
					placeholder="Select Organisation"
					asyncKey="organizations"
					initialCall={rest.action !== 'edit'}
					isClearable
					params={ORG_PARAMS}
					value={organization?.organization_id}
					onChange={handleOrgChange}
					renderLabel={renderOrgLabel}
					prefix={<IcMManufacturing fontSize={16} />}
				/>

				{errors.organization_id && (
					<div className={styles.error_message}>
						This is required
					</div>
				)}
			</div>

			<div className={styles.form_item}>
				<div className={styles.label}>
					Select an User
					{' '}
					<div className={styles.required_mark}>*</div>
				</div>

				<Select
					name="user_id"
					placeholder="Select User"
					value={organization?.user_id}
					options={organization?.organization_id ? userOptions : []}
					onChange={handleUserChange}
					prefix={<IcMProfile fontSize={16} />}
					loading={loading}
				/>

				{errors.user_id && !isEmpty(errors.user_id) && (
					<div className={styles.error_message}>
						This is required
					</div>
				)}
			</div>
		</div>
	);
}

export default OrganisationForm;
