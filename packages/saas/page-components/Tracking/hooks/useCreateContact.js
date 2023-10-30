import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useTranslation } from 'next-i18next';

import toastApiError from '../../../utils/toastApiError';

const CREATE_CONTACT_URL = {
	ocean : '/create_saas_shipment_poc',
	air   : '/create_saas_air_shipment_poc',
};

const useCreateContact = ({ setAddContact, fetchContactList = () => {}, activeTab = 'ocean' }) => {
	const { t } = useTranslation(['common', 'airOceanTracking']);

	const { orgId, branchId } = useSelector((state) => ({
		orgId    : state.profile.organization.id,
		branchId : state.general.query.branch_id,
	}));

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : CREATE_CONTACT_URL[activeTab],
	}, { manual: true });

	const formHook = useForm();
	const closeHandler = () => setAddContact(false);

	const createContact = async ({ data = {}, src = '' }) => {
		const { name = '', company = '', mobile_no = {}, email = '', mobileNo = '' } = data || {};
		const { country_code = '', number = '' } = mobile_no || {};

		try {
			await trigger({
				data: {
					name,
					company,
					email,
					mobile_no              : (country_code + number) || mobileNo,
					organization_id        : orgId,
					organization_branch_id : branchId,
				},
			});

			if (src === 'contactModal') {
				Toast.success(t('airOceanTracking:tracking_succesfully_created_contact_toast'));
				fetchContactList();
				closeHandler();
			}
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		createContact,
		closeHandler,
		loading,
		formHook,
	};
};

export default useCreateContact;
