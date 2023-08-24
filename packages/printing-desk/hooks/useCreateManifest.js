import { Toast } from '@cogoport/components';
import { useRequestAir } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useTranslation } from 'next-i18next';

const AGENT_CONDITION = ['partner', 'micro_service'];

const useCreateManifest = () => {
	const { t } = useTranslation(['printingDesk']);
	const { user_data:userData } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));

	const [{ loading }, trigger] = useRequestAir(
		{
			url     : '/air-coe/documents/create-manifest',
			method  : 'POST',
			authKey : 'post_air_coe_documents_create_manifest',
		},
	);

	const createManifest = async (payload, setTriggerManifest) => {
		try {
			await trigger({
				data: {
					...payload,
					uploadedByUserId   : userData?.user?.id,
					uploadedByUserType : AGENT_CONDITION.includes(userData?.session_type) ? 'agent' : 'user',
				},
			});
			setTriggerManifest('');
		} catch (err) {
			Toast.error(err?.message || t('printingDesk:common_error_message1'));
		}
	};

	return {
		createManifest,
		loading,
	};
};
export default useCreateManifest;
