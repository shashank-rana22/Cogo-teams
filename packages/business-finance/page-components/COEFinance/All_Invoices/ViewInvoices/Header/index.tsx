import React, { useState } from 'react'
import { Button } from '@cogoport/components'
import {useRouter} from '@cogoport/next'
import styles from './styles.module.css'
import {RemarksValInterface} from '../../../../commons/Interfaces/index';
import useApproveReject from '../../../hook/useApproveReject'
import { Modal } from '@cogoport/components';

interface BillAdditionalInterface{
    collectionPartyId?:string
}
interface DataInterface {
    billAdditionalObject?:BillAdditionalInterface
}
interface HeaderInterface {
    data?:DataInterface
    remarksVal?:RemarksValInterface

}
const Header =({data,remarksVal}:HeaderInterface) => {
   const {loading, rejectApi} =useApproveReject(remarksVal);
    const [approve,setApprove]=useState(false)
    const Router = useRouter();
    const handleReject=()=>{
        rejectApi();
        console.log('remarksVal->',remarksVal);
    }
    const collectionPartyId = data?.billAdditionalObject?.collectionPartyId;

    // const {handleSubmit} = useApproveReject({collectionPartyId})

return(
<div>
    <div className={styles.container}>
        <Button size="md" themeType="secondary" onClick={()=>Router.push('/business-finance/coe-finance/[active_tab]','/business-finance/coe-finance/all_invoices')}>Go Back</Button>
        <div className={styles.subContainer}>
            <Button size="md" style={{marginRight:'8px'}}  onClick={()=>{setApprove(true)}} >Approve</Button>
            <Button size="md" style={{marginRight:'8px'}} disabled>Approve & Hold</Button>
            <Button size="md" style={{marginRight:'8px' ,background: '#ED3726'}} onClick={handleReject}>Reject</Button>
        </div>
    </div>
    <div className={styles.hr}/>
    {approve && 
        <Modal size="lg" show={approve} onClose={()=>{setApprove(false)}}>
             <Modal.Header title="Are you sure you want to approve this invoice ?" />
             <Modal.Body>
                <div className={styles.button}>
                  <Button size="md" style={{marginRight:'8px'}} >No</Button>
                  <Button size="md" style={{marginRight:'8px'}} >Yes</Button>
                </div>
             </Modal.Body>
             
        </Modal>}
</div>

)
}
export default Header