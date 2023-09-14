import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

function useUpdateLeadOrganization({ listLeadsData = {} }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_lead_organization',
		method : 'POST',
	}, { manual: true });

	const updateLeadOrganization = async ({ payload }) => {
		try {
			await trigger({ data: payload });

			Toast.success('Successful');
		} catch (error) {
			toastApiError(error);
		}
	};

	const updateDetails = (values) => {
		const payload = {
			account_type        : 'importer_exporter',
			business_name       : values?.company_name,
			id                  : listLeadsData?.id,
			country_id          : values?.country_id,
			registration_number : values?.registration_number,

		};

		updateLeadOrganization({ payload });
	};

	return {
		updateLoading: loading,
		updateLeadOrganization,
		updateDetails,
	};
}

export default useUpdateLeadOrganization;
