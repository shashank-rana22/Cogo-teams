import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

const useApproveConcor = ({
	refetch, setShowModal, id,
}) => {
	const [
		{ loading },
		trigger,
	] = useRequestBf(
		{
			url     : `/incident-management/incident/${id}`,
			method  : 'patch',
			authKey : 'patch_incident_management_incident_by_id',
		},
		{ manual: true },
	);

	const useOnAction = async (inputValues) => {
		const { utr, paymentProof, remarks, bankId, bankname, bankAccountNo } = inputValues || {};
		try {
			const apiResponse = await trigger({
				data: {
					transactionRefNo : utr,
					paymentProof,
					remarks,
					bankId,
					bankname,
					cogAccountNo     : bankAccountNo,
				},
			});
			const {
				data: { message },
			} = apiResponse;
			if (message === 'Updated Successfully') {
				Toast.success('Request Updated Sucessfully');
				setShowModal(false);
				refetch();
			} else {
				Toast.error(message);
			}
		} catch (e) {
			Toast.error(e?.response?.data?.message || 'Something went wrong');
		}
	};

	return {
		useOnAction,
		loading,
	};
};

export default useApproveConcor;
