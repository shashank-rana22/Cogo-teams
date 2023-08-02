// import toastApiError from '@cogoport/air-modules/utils/toastApiError';
// import { useRequestAir } from '@cogoport/request';

// const useCreateConfiguration = ({
// 	controls = {},
// }) => {
// 	const [{ loading }, trigger] = useRequestAir(
// 		{
// 			url    : 'air-coe/warehouse-management/configuration',
// 			method : 'POST',
// 		},
// 	);

// 	const createConfig = async (payload, setTriggerConfig) => {
// 		try {
// 			await trigger({
// 				data: {
// 					...payload,
// 					uploadedByUserId   : userData?.user?.id,
// 					uploadedByUserType : AGENT_CONDITION.includes(userData?.session_type) ? 'agent' : 'user',
// 				},
// 			});
// 			setTriggerConfig('');
// 		} catch (err) {
// 			toastApiError(err?.message || 'Failed to Create');
// 		}
// 	};
// };

// export default useCreateConfiguration;
