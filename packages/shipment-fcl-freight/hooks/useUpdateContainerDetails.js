import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useUpdateContainerDetails = ({
	containerValue = {},
	setEditContainerNum = () => {},
	refetch = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_container_details',
		method : 'POST',
	});

	const handleSubmit = async () => {
		const update_data = [];
		Object.keys(containerValue || {}).forEach((key) => {
			const reqObj = {
				id   : key,
				data : {
					container_number: containerValue[key],
				},
			};
			update_data.push(reqObj);
		});

		try {
			const res = await trigger({ data: { update_data } });

			if (res.status === 200) {
				Toast.success('Container Details Updated Successfully!');
				setEditContainerNum(false);
				refetch();
			} else {
				Toast.error('Please check the details filled or try again!');
			}
		} catch (err) {
			Toast.error(getApiErrorString(err));
		}
	};

	return {
		handleSubmit,
		loading,
	};
};

export default useUpdateContainerDetails;
