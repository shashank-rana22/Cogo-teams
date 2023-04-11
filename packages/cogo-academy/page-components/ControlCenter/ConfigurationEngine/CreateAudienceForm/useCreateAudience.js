import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

function useCreateAudience({
	setConfigurationPage,
	fetchAudiences = () => {},
	source = '',
	setShowCreateAudienceModal = () => {},
}) {
	const router = useRouter();

	const { control, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm();

	const [{ loading }, trigger] = useRequest({
		url    : '/create_faq_audience',
		method : 'POST',
	}, { manual: true });

	const handlePersona = ({ platform = '', personaValue = '' }) => {
		const PERSONA_MAPPING = {
			admin   : 'admin_user',
			app     : 'importer_exporter',
			all     : 'all',
			partner : personaValue,

		};
		return PERSONA_MAPPING[platform];
	};

	const createAudience = async (values) => {
		const {
			platform,
			persona :personaValue = '',
			auth_function,
			auth_sub_function,
			...rest
		} = values || {};

		const payload = {
			platform,
			...rest,
			auth_function,
			auth_sub_function : auth_function === 'all' ? 'all' : auth_sub_function,
			persona           : handlePersona({ personaValue, platform }),

		};

		try {
			await trigger({
				data: payload,
			});

			fetchAudiences();
			setShowCreateAudienceModal(false);
			Toast.success('Audience created sucessfully');
			setConfigurationPage('dashboard');
			if (source !== 'create') router.back();
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data));
		}
	};
	return {
		createAudience,
		control,
		handleSubmit,
		errors,
		setValue,
		reset,
		watch,
		loading,

	};
}

export default useCreateAudience;
