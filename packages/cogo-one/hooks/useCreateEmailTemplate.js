import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const getPayload = ({ data, templateTags }) => {
	const snakeCaseName = data?.name?.trim()?.split(' ')?.join('_').toLowerCase();

	return {
		...data,
		source        : 'rich_text',
		provider_name : 'aws',
		category      : 'sales_prospecting',
		subject       : data?.name,
		tags          : [snakeCaseName, ...(templateTags || [])],
	};
};

function useCreateEmailTemplate({
	templateTags = [],
	setShowCreation = () => {},
	setTemplateData = () => {},
}) {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_communication_template',
		method : 'post',
	}, { manual: true });

	const createTemplate = async ({ data = {} }) => {
		try {
			const res = await trigger({
				data: getPayload({ data, templateTags }),
			});
			setShowCreation(false);
			setTemplateData(res.data);
			Toast.success('Successfully Created');
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
