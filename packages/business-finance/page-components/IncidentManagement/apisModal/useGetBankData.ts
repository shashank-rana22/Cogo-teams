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
interface BankInterface {
	accountNumber?:string
	documentUrls?:Array<object>
	branchName?:string
	bankName?:string
	bankHolderName?:string
	remark?:string
	ifscCode?:string
	swiftCode?:string
	id?:string
}
interface HookInterface {
	value?:DataInterface
	bankId?:string
	bankData?:BankInterface
	setShowBankModal?: React.Dispatch<React.SetStateAction<boolean>>
	refetch?:()=>{}
}

const useGetBankData = ({
	bankData,
	setShowBankModal,
	refetch,
	bankId,
	value,
}:HookInterface) => {
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
		swiftCode,
		remark,
		id,
	} = bankData || {};

	const useOnActionBank = async (status :string) => {
		try {
			const apiResponse = await trigger({
				data: {
					remark    : value?.text || '',
					status,
					updatedBy : userId,
					data      : {
						bankRequest: {
							isBankNameValid      : value.radioName === 'true',
							isAccountNumberValid : value.radioNumber === 'true',
							isBranchNameValid    : value.radioBranchName === 'true',
							isIfscCodeValid      : ifscCode ? value.radioIFSC === 'true' : false,
							methodOfVerification : value.radioMethod,
							accountNumber,
							bankHolderName,
							bankName,
							branchName,
							documentUrls,
							id,
							ifscCode,
							swiftCode,
							isSwiftCodeValid     : swiftCode ? value.radioIFSC === 'true' : false,
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
			Toast.error(e?.response?.data?.message);
		}
	};

	return { useOnActionBank, loading };
};

export default useGetBankData;
