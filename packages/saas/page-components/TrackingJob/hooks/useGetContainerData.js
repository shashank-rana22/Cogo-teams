import { useRequest, useScope } from '@cogo/commons/hooks';
import { getApiErrorString } from '@cogoport/front/utils';
import { toast } from '@cogoport/front/components/admin';

const useGetContainerData = ({ reset, refetch }) => {
	const { scope } = useScope();
	const submitAPI = useRequest(
		'post',
		false,
		scope,
	)('/update_container_and_bl_milestones');
	const onSubmit = async (values = {}, showUpdate, setShowUpdate) => {
		const payload = {
			...values,
			saas_container_subscription_id:
				showUpdate.data.saas_container_subscription_id,
			search_type: showUpdate.data.search_type,
		};
		try {
			await submitAPI.trigger({
				data: payload,
			});
			setShowUpdate({ show: false });
			reset();
			refetch();
			toast.success('Tracking Data Added Successfully');
		} catch (err) {
			toast.error(getApiErrorString(err.data));
		}
	};
	return {
		submitAPI,
		onSubmit,
	};
};

export default useGetContainerData;
