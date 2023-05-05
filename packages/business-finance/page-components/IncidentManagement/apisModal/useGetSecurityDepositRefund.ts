import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

interface Props {
	status?:string,
}

interface PropsData {
	refetch?:()=>void,
	setShowDepositModal?:(p:boolean)=>void,
	id?: string | number,
	remarkValue?:string,
}

const GetSecurityDepositRefundData = ({
	refetch,
	setShowDepositModal,
	id,
	remarkValue,
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
			const apiResponse = await trigger({
				data: {
					status,
					remark    : remarkValue,
					updatedBy : userId,
				},
			});
			const {
				data: { message },
			} = apiResponse;
			if (message === 'Updated Successfully') {
				Toast.success('Request Updated Sucessfully');
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

export default GetSecurityDepositRefundData;
