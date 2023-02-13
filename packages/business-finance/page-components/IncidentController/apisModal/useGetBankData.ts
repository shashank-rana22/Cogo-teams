import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

interface DataInterface {
	text?:string
	radioName?:string
	radioMethod?:string
	radioIFSC?:string
	radioBranchName?:string
	radioNumber?:string
}
interface HookInterface {
	data?:DataInterface
	status?:string
}

const useGetBankData = ({
	bankData,
	setShowBankModal,
	refetch,
	bankId,
}) => {
	const { user_id:userId } = useSelector(({ profile }) => ({
		user_id: profile?.user?.id,
	}));

	const [
		{ loading },
		trigger,
	] = useRequestBf(
		{
			url     : `/incident-management/incident/${bankId}`,
			method  : 'patch',
			authKey : 'patch_incident_management_incident_by_id',
		},
		{ manual: true },
	);
	const {
		accountNumber,
		bankHolderName,
		bankName,
		branchName,
		documentUrls,
		ifscCode,
		remark,
		id,
	} = bankData || {};

	const useOnActionBank = async ({ data, status }:HookInterface) => {
		try {
			const apiResponse = await trigger({
				data: {
					remark    : data?.text || '',
					status,
					updatedBy : userId,
					data      : {
						bankRequest: {
							isBankNameValid      : data.radioName === 'true',
							isAccountNumberValid : data.radioNumber === 'true',
							isBranchNameValid    : data.radioBranchName === 'true',
							isIfscCodeValid      : data.radioIFSC === 'true',
							methodOfVerification : data.radioMethod,
							accountNumber,
							bankHolderName,
							bankName,
							branchName,
							documentUrls,
							id,
							ifscCode,
							remark,
						},
					},
				},
			});
			const {
				data: { message },
			} = apiResponse;
			if (message === 'Updated Successfully') {
				Toast.success('Request Updated Sucessfully');
				setShowBankModal(false);
				refetch();
			} else {
				Toast.error(message);
			}
		} catch (e) {
			Toast.error(e?.error?.message);
		}
	};

	return { useOnActionBank, loading };
};

export default useGetBankData;
