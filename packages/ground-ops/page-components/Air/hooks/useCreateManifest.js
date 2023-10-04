import { Toast } from '@cogoport/components';
import { useRequestAir } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const AGENT_CONDITION = ['partner', 'micro_service'];

const useCreateManifest = () => {
	const { user_data:userData } = useSelector(({ profile }:any) => ({
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
			setTriggerManifest(null);
		} catch (err) {
			Toast.error(err?.message || 'Failed to Create');
		}
	};

	return {
		createManifest,
		loading,
	};
};
export default useCreateManifest;
