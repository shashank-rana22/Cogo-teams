import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';

const getPayload = ({ data }) => {
	const { content = '', title = '', language = '' } = data || {};
	const snakeCaseName = title.split(' ').join('_').toLowerCase();
	const selectedLangCode = GLOBAL_CONSTANTS.languages.find((eachLanguage) => eachLanguage.value === language)?.code;

	return {
		name          : snakeCaseName,
		provider_name : 'meta',
		type          : 'whatsapp',
		content       : JSON.stringify({
			name       : snakeCaseName,
			category   : 'marketing',
			language   : selectedLangCode,
			components : [{ text: content?.trim(), type: 'body' }],
		}),
		variables     : [],
		description   : title,
		tags          : ['quick_reply'],
		category      : 'company_introduction',
		// eslint-disable-next-line max-len
		html_template : `<p>${content}</p>\n <div style="display: flex; justify-content: flex-end; color: rgba(0, 0, 0, .45); font-size: 10px;"><div>21:6</div></div>`,
		language,
	};
};

function useCreateCommunicationTemplate() {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_communication_template',
		method : 'post',
	}, { manual: true });
	const createTemplate = async ({ data = {}, sucessCallBackFunc = () => {} }) => {
		try {
			await trigger({
				data: getPayload({ data }),
			});
			sucessCallBackFunc();
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
