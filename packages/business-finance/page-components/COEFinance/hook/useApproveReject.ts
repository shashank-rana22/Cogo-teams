import { useRequestBf } from '@cogoport/request';
import {  Toast } from '@cogoport/components';
import { RemarksValInterface } from '../../commons/Interfaces/index';

interface ApproveRejectInterface {
    collectionPartyId?:string
    remarksVal?:RemarksValInterface
}

const ApproveReject = ({collectionPartyId,remarksVal}:ApproveRejectInterface) => {
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
