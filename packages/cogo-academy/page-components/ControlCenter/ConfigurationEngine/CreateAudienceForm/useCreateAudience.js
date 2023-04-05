import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function useCreateAudience({
	setConfigurationPage,
	fetchAudiences = () => {},
	source = '',
	setShowCreateAudienceModal = () => {},
}) {
	const router = useRouter();

	const { control, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm();

	const { general } = useSelector((state) => state);
	const { id:audienceId } = general.query || {};

	const apiName = audienceId ? '/update_faq_audience' : '/create_faq_audience';
	const toastText = audienceId ? 'updated' : 'created';

	const [{ loading }, trigger] = useRequest({
		url    : apiName,
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
			id                : audienceId || undefined,
			platform,
			...rest,
			auth_function,
			auth_sub_function : auth_function === 'all' ? 'all' : auth_sub_function,
			persona           : handlePersona({ personaValue, platform }),

		};

		try {
			const res = await trigger({
				data: payload,
			});

			fetchAudiences();
			setShowCreateAudienceModal(false);

			if (res?.data) {
				Toast.success(`Audience ${toastText} sucessfully`);
				setConfigurationPage('dashboard');
				if (source !== 'create') router.back();
			}
		} catch (err) {
			Toast.error('Something went wrong');
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
