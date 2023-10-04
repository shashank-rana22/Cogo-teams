import { useRequest } from '@cogoport/request';

const useUpdateCommunication = () => {
	const [, triggerCommunication] = useRequest({
		url    : '/update_communication',
		method : 'POST',
	}, { manual: true });

	return {
		triggerCommunication,
	};
};
export default useUpdateCommunication;
