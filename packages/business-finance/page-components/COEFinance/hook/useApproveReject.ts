import { useRequestBf } from '@cogoport/request';
import {useSelector} from '@cogoport/store';
import {  Toast } from '@cogoport/components';
import { RemarksValInterface } from '../../commons/Interfaces/index';

interface ApproveRejectInterface {
    collectionPartyId?:string
    remarksVal?:RemarksValInterface
    modalData?:string
    setApprove: React.Dispatch<React.SetStateAction<boolean>>,
    billId?:string,
    lineItemsRemarks?:object
}

const ApproveReject = ({collectionPartyId,remarksVal, lineItemsRemarks,modalData,setApprove, billId}:ApproveRejectInterface) => {
   
    const { user_data } = useSelector(({ profile }:any) => ({
		user_data: profile || {},
	}));
    

    const getStatus = () =>{
        if(modalData === 'Approve'){
            return 'FINANCE_ACCEPTED'
        }
        if(modalData === 'Hold'){
            return 'ON_HOLD'
        }     
        if(modalData === 'Reject'){
            return 'COE_REJECTED'
        }
    }

    const [
        { data, loading },
        trigger,
    ] = useRequestBf(
        {
            url: "/purchase/bills/status-v2",
            method: "put",
        },
        { autoCancel: false }
    );

    const rejectApproveApi = async()=>{
        try{
            await trigger({
                data :{
                    status:getStatus(),
                    id:billId,
                    updatedBy:user_data?.id,
                    performedByUserType:user_data?.session_type,
                    remarksList: modalData!=='Approve' ? remarksVal :undefined,
                    lineItemsRemarks: modalData!=='Approve' ? lineItemsRemarks : undefined,
                }
            })
            setApprove(false)
            Toast.success('Rejected Successfully')
        }catch(error:any){
            console.log('error->',error);
            Toast.error(error?.message || 'Something went wrong');
        }
    }


	return {
		loading,
        rejectApproveApi,
	};
};

export default ApproveReject;
