import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

interface DepositInterface {
	advanceDocumentId?: string,
	amountPerContainer?:number,
	numberOfContainers?:number,
	totalAmountToBePaid?:number,
	paymentMode?: string,
	remark?: string,
	supplierName?: string,
}

interface Props {
	status?:string,
}

interface PropsData {
	advanceSecurityDeposit?:DepositInterface,
	refetch?:()=>void,
	setShowDepositModal?:(p:boolean)=>void,
	id?: string | number,
	remarkValue?:string,
	t?: Function,
}

const useGetSecurityDepositData = ({
	advanceSecurityDeposit,
	refetch,
	setShowDepositModal,
	id,
	remarkValue,
	t,
}:PropsData) => {
	const { user_id:userId } = useSelector(({ profile }) => ({
		user_id: profile?.user?.id,
	}));

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

	const getData = async ({ status }:Props) => {
		try {
			const payload = {
				data: {
					advanceSecurityDeposit,
				},
				status,
				remark    : remarkValue,
				updatedBy : userId,
			};
			const apiResponse = await trigger({
				data: payload,
			});
			const {
				data: { message },
			} = apiResponse;
			if (message === 'Updated Successfully') {
				Toast.success(t('incidentManagement:request_updated_successfully_message'));
				setShowDepositModal(false);
				refetch();
			} else {
				Toast.error(message);
			}
		} catch (e) {
			Toast.error(e?.response?.data?.message);
		}
	};

	return {
		getData,
		loading,
	};
};

export default useGetSecurityDepositData;
