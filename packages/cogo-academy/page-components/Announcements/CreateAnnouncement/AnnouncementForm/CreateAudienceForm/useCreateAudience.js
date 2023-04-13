import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';

const handlePersona = ({ platform = '', personaValue = '' }) => {
	const PERSONA_MAPPING = {
		admin   : 'admin_user',
		app     : 'importer_exporter',
		all     : 'all',
		partner : personaValue,

	};
	return PERSONA_MAPPING[platform];
};

function useCreateAudience({
	fetchAudiences = () => {},
	setShowCreateAudience = () => {},
}) {
	const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm();

	const [{ loading }, trigger] = useRequest({
		url    : '/create_faq_audience',
		method : 'POST',
	}, { manual: true });

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
			const res = await trigger({
				data: payload,
			});

			fetchAudiences();
			setShowCreateAudience(false);

			if (res?.data) {
				Toast.success('Audience created sucessfully');
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
		watch,
		loading,
	};
}

export default useCreateAudience;
