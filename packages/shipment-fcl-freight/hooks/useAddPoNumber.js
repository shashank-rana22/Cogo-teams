import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useAddPoNumber = ({
	shipment_data = {},
	setShow = () => {},
	refetch = () => {},
	poNumber = '',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'update_shipment',
		method : 'POST',
	}, { manual: true });

	const onCreate = async () => {
		try {
			await trigger({
				data: {
					id        : shipment_data?.id || undefined,
					po_number : poNumber,
				},
			});
			setShow(false);
			refetch();
			Toast.success('Purchase Order Number Added!');
		} catch (err) {
			Toast.error(err);
		}
	};

	return {
		onCreate,
		loading,
	};
};

export default useAddPoNumber;
