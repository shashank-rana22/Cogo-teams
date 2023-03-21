import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useCancelAdditionalService = ({
	id,
	remarkValues,
	refetch,
	setShowCancel = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_additional_service',
		method : 'POST',
	});

	const updateServiceList = async () => {
		try {
			const res = await trigger({
				data: {
					id,
					remarks : [remarkValues],
					state   : 'cancelled',
				},
			});

			if (!res.error) {
				Toast.success('Service Removed.');
				refetch();
				setShowCancel(false);
			} else if (res.error) {
				Toast(res?.messages);
			}
		} catch (err) {
			Toast.error(err?.data);
		}
	};

	return {
		updateServiceList,
		loading,
	};
};

export default useCancelAdditionalService;
