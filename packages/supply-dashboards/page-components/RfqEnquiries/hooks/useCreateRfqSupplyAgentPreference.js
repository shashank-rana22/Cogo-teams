import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useCreateRfqSupplyAgentPreference = ({ item, reason, setShow, refetch }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_rfq_supply_agent_preference',
		method : 'POST',
	}, { manual: true });

	const createRfqSupplyAgentPreference = async () => {
		try {
			await trigger({
				data: {
					status : 'closed',
					id     : item?.id,
					reason,
				},
			});
			setShow(false);
			refetch();
			Toast.success('rfq closed successfully');
		} catch (err) {
			// console.log(err);
		}
	};
	return {
		createRfqSupplyAgentPreference,
		loading,
	};
};
export default useCreateRfqSupplyAgentPreference;
