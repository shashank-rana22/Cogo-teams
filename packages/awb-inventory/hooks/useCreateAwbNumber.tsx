import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useCreateAwbNumber = (
	setShow,
	awbList,
	setActiveTab,
	setPage,
	setFinalList,
	page,
) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_awb_inventory',
		method : 'POST',
	});

	const createAwbNumber = async (finalData) => {
		const payload = {
			status: 'available',
			...finalData,
		};
		try {
			await trigger({
				data: payload,
			});
			Toast.success('AWB Number is successfully added.');
			setFinalList([]);
			setActiveTab('awb_number');
			setShow(false);
			if (page === 1) {
				awbList();
			} else {
				setPage(1);
			}
		} catch (error) {
			const { data = {} } = error;
			const { base = '' } = data;
			const cleanStr = base.replace(/Base/g, '');
			Toast.error(cleanStr || 'Unable to Add AWB Number');
		}
	};

	return {
		createAwbNumber,
		loading,
	};
};

export default useCreateAwbNumber;
