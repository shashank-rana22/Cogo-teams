import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

const getPayload = ({ data }) => {
	const snakeCaseName = data?.name?.trim()?.split(' ')?.join('_').toLowerCase();

	return {
		...data,
		source        : 'rich_text',
		provider_name : 'aws',
		category      : 'sales_prospecting',
		subject       : data?.name,
		tags          : [snakeCaseName, data?.rpa_template_type || ''],
	};
};

function useCreateEmailTemplate({
	setShowCreation = () => {},
}) {
	const { query } = useRouter();
	const [{ loading }, trigger] = useRequest({
		url    : '/create_communication_template',
		method : 'post',
	}, { manual: true });

	const createTemplate = async ({ data = {} }) => {
		try {
			const res = await trigger({
				data: getPayload({ data }),
			});
			setShowCreation(false);
			Toast.success('Successfully Created');
			if (res?.data?.id) {
				window.open(
					`${window.location.origin}/${query?.partner_id}/marketing/templates/${res?.data?.id}`,
					'_blank',
				);
			}
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something Went Wrong');
		}
	};

	return {
		createTemplate,
		loading,
	};
}
export default useCreateEmailTemplate;
