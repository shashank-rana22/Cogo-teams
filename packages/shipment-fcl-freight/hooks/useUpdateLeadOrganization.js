import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const getFormattedPayload = ({ values = {}, leadsData = {} }) => {
	const payload = {
		account_type        : 'importer_exporter',
		business_name       : values?.company_name,
		id                  : leadsData?.id,
		country_id          : values?.country_id,
		registration_number : values?.registration_number,
		bypass_duplicacy    : true,
	};

	return payload;
};

function useUpdateLeadOrganization({ leadsData = {}, refetchList = () => {} }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_lead_organization',
		method : 'POST',
	}, { manual: true });

	const updateLeadOrganization = async (values) => {
		try {
			const payload = getFormattedPayload({ values, leadsData });

			await trigger({ data: payload });

			refetchList();

			Toast.success('Successful');
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		updateLoading: loading,
		updateLeadOrganization,
	};
}

export default useUpdateLeadOrganization;
