import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useOffboardAgent = (props) => {
	const {
		actionModal = {},
		setActionModal = () => {},
		refetch = () => {},
	} = props;

	const api = useRequest({
		url    : '/update_partner_user_status_for_enrichment',
		method : 'post',
	}, { manual: true });

	const [{ loading }, trigger] = api;

	const offboardAgent = async () => {
		try {
			await trigger({
				data: {
					id     : actionModal?.agentData?.id,
					status : 'inactive',
				},
			});
			Toast.success('Agent Deactivated Successfully!!!');
			setActionModal({});
			refetch();
		} catch (err) {
			Toast.error(err?.error?.message || 'Something went wrong');
		}
	};

	return {
		loadingOffboard: loading,
		offboardAgent,

	};
};

export default useOffboardAgent;
