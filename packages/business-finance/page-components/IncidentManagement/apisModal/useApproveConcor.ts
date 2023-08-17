import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useApproveConcor = ({
	refetch,
	setShowModal,
	id,
	concorData,
}) => {
	const { user_id:userId } = useSelector(({ profile }) => ({
		user_id: profile?.user?.id,
	}));
	const {
		placeOfDestination = '',
		documentDate = '',
		placeOfSupply = '',
		dueDate = '',
		isTaxApplicable = false,
		bankName = '',
		accountNumber = '',
		ifscCode = '',
		beneficiaryName = '',
		bookingProof = [],
		supplierName = '',
		entity = '',
		sid = '',
		totalBuyPrice = '',
		currency = '',
		registrationNo = '',
	} = concorData || {};
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

	const useOnAction = async (inputValues, status) => {
		const { remarks } = inputValues || {};
		try {
			const apiResponse = await trigger({
				data: {
					status,
					remark : remarks,
					data   : {
						concorPdaApprovalRequest: {
							sid,
							totalBuyPrice,
							bookingProof,
							bankName,
							placeOfDestination,
							documentDate,
							placeOfSupply,
							dueDate,
							isTaxApplicable,
							accountNumber,
							ifscCode,
							beneficiaryName,
							supplierName,
							registrationNo,
							entity,
							currency,

						},
					},
					updatedBy: userId,
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
