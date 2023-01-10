import { useRequestBf } from '@cogoport/request';
import {  Toast } from '@cogoport/components';
import { RemarksValInterface } from '../../commons/Interfaces/index';

interface ApproveRejectInterface {
    collectionPartyId?:string
    remarksVal?:RemarksValInterface
    modalData?:string
}

const ApproveReject = ({collectionPartyId,remarksVal,modalData}:ApproveRejectInterface) => {
   
    const getStatus = () =>{
        if(modalData === 'Approve'){
            return 'FINANCE_ACCEPTED'
        }
        if(modalData === 'Approve & Hold'){
            return 'HOLD'
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
            authkey: "put_purchase_bills_status_v2",
        },
        { autoCancel: false }
    );

    const rejectApi = async()=>{
        try{
            await trigger({
                status:getStatus(),
                remarks: remarksVal
            })
            Toast.success('Rejected Successfully')
        }catch(error){
            console.log('error->',error);
        }
    }


	return {
		loading,
        rejectApi,
	};
};

export default ApproveReject;
