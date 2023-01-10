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
    lineItem?:boolean

}

const Header =({data,remarksVal,lineItem}:HeaderInterface) => {
    const [approve,setApprove]=useState(false)
    const [modalData , setModalData] = useState('')
    const Router = useRouter();

    const collectionPartyId = data?.billAdditionalObject?.collectionPartyId || '';

    const {loading, rejectApi} = useApproveReject({collectionPartyId,remarksVal,modalData});

    const handleModalData = (e:any) =>{
        setModalData(e.target.innerText)        
        setApprove(true)
    }

    const handleApproveAndReject =()=>{
        rejectApi();
        setApprove(false)
        console.log('remarksVal->',remarksVal);
    }

return(
<div>
    <div className={styles.container}>
        <Button size="md" themeType="secondary" onClick={()=>Router.push('/business-finance/coe-finance/[active_tab]','/business-finance/coe-finance/all_invoices')}>Go Back</Button>
        <div className={styles.subContainer}>
            <Button size="md" style={{marginRight:'8px'}} disabled={!lineItem}  onClick={(e:any)=>handleModalData(e)}>Approve</Button>
            <Button size="md" style={{marginRight:'8px'}} disabled={!lineItem} onClick={(e:any)=>handleModalData(e)}>Approve & Hold</Button>
            <Button size="md" style={{marginRight:'8px' ,background: '#ED3726'}} disabled={!lineItem} onClick={(e:any)=>handleModalData(e)} >Reject</Button>
        </div>
    </div>
    <div className={styles.hr}/>
    {approve && 
        <Modal size="lg" show={approve} onClose={()=>{setApprove(false)}}>
             <Modal.Header title={`Are you sure you want to ${modalData} this invoice ?`}/>
             <Modal.Body>
                <div className={styles.button}>
                  <Button size="md" style={{marginRight:'8px'}} onClick={()=>{setApprove(false)}} >No</Button>
                  <Button size="md" style={{marginRight:'8px'}} onClick={()=>handleApproveAndReject()}>Yes</Button>
                </div>
             </Modal.Body>
             
        </Modal>}
</div>

)
}
export default Header