import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

interface Props {
	item?: any;
	awbList?: Function;
	setShowEdit?: Function;
	setPage?: Function;
	setFinalList?: Function;
	setQfilter?: Function;
	setShowConfirm?: Function;
	page?: number;
}

const useEditAwbNumber = ({
	item = {},
	awbList,
	setShowEdit = () => {},
	setPage,
	setFinalList,
	setQfilter,
	setShowConfirm = () => {},
	page,
}:Props) => {
	const { id = '' } = item;
	const [{ loading }, trigger] = useRequest({
		url    : '/update_awb_inventory',
		method : 'POST',
	});

	const editAwbNumber = async (finalData) => {
		const toastMessage = {
			cancelled : 'AWB Number is successfully deleted.',
			available : 'AWB Number is successfully recovered.',
		};

		const payload = {
			id,
			...finalData,
		};
		try {
			await trigger({
				data: payload,
			});
			Toast.success(
				toastMessage[finalData?.status]
					|| 'AWB Number is successfully updated.',
			);
			setShowConfirm(false);
			setFinalList([]);
			setQfilter('');
			setShowEdit(false);
			if (page === 1) {
				awbList();
			} else {
				setPage(1);
			}
		} catch (error) {
			const { data = {} } = error;
			const { base = '' } = data;
			const cleanStr = base.replace(/Base/g, '');
			Toast.error(cleanStr || 'Unable to Update AWB Number');
		}
	};

	return {
		editAwbNumber,
		loading,
	};
};

export default useEditAwbNumber;
