/* eslint-disable max-len */
import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

function useCreateCommunicationTemplate({ reset = () => {}, refetch = () => {}, setOpenCreateReply = () => {} }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_communication_template',
		method : 'post',
	}, { manual: true });
	const createTemplate = async (data = {}) => {
		const { content = '', title = '' } = data || {};
		try {
			await trigger({
				data: {
					name          : title.split(' ').join('_').toLowerCase(),
					provider_name : 'meta',
					type          : 'whatsapp',
					content       : JSON.stringify({
						name       : title.split(' ').join('_').toLowerCase(),
						category   : 'marketing',
						language   : 'en_US',
						components : [{ text: content?.trim(), type: 'body' }],
					}),
					variables     : [],
					description   : title,
					tags          : ['quick_reply'],
					category      : 'company_introduction',
					html_template : `<p>${content}</p>\n <div style="display: flex; justify-content: flex-end; color: rgba(0, 0, 0, .45); font-size: 10px;"><div>21:6</div></div>`,
				},
			});
			reset({});
			refetch();
			setOpenCreateReply(false);
			Toast.success('Successfully Created');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};
	return {
		createTemplate,
		loading,
	};
}
export default useCreateCommunicationTemplate;
