import React, { useState } from 'react'
import { Button, Textarea } from '@cogoport/components'
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
    remarksVal:RemarksValInterface
    lineItem?:boolean
    lineItemsRemarks:object
    status:string
    setRemarksVal:any
}

const Header =({data,remarksVal,lineItem, lineItemsRemarks, status, setRemarksVal}:HeaderInterface) => {
    const [approve,setApprove]=useState(false)
    const [modalData , setModalData] = useState('')
    const Router = useRouter();
    const billId = Router?.query?.billId;

    
    const collectionPartyId = data?.billAdditionalObject?.collectionPartyId || '';

    const {loading, rejectApproveApi} = useApproveReject({collectionPartyId,remarksVal,lineItemsRemarks,modalData,setApprove, billId});

    const handleModalData = (e:any) =>{
        setModalData(e.target.innerText)        
        setApprove(true)
    }

    const handleApproveAndReject =()=>{
        rejectApproveApi();
    }


    const isApproveDisabled = Object.keys(lineItemsRemarks)?.length>0 || remarksVal?.billingPartyRemark?.length>0 || remarksVal?.collectionPartyRemark?.length>0 || remarksVal?.invoiceDetailsRemark?.length>0;
  
return(
<div>
    <div className={styles.container}>
        <Button size="sm" themeType="secondary" onClick={()=>Router.push('/business-finance/coe-finance/[active_tab]','/business-finance/coe-finance/all_invoices')}>Go Back</Button>
        <div className={styles.subContainer}>
            <Button size="sm" themeType="secondary"  style={{marginRight:'8px'}} disabled={!lineItem || isApproveDisabled}  onClick={(e:any)=>handleModalData(e)}>Approve</Button>
            <Button size="sm"  themeType="secondary"  style={{marginRight:'8px'}} disabled={status==="FINANCE_ACCEPTED"}  onClick={(e:any)=>handleModalData(e)}>Hold</Button>
            <Button size="sm" style={{marginRight:'8px'}} disabled={!lineItem || !isApproveDisabled} onClick={(e:any)=>handleModalData(e)} >Reject</Button>
        </div>
    </div>
    <div className={styles.hr}/>
    {approve && 
        <Modal size="md" show={approve} onClose={()=>{setApprove(false)}}>
             <Modal.Body>
                 <div className={styles.heading}>Are you sure you want to {modalData} this invoice ?</div>
                 <Textarea 
			name="remark" 
			size="md" 
			placeholder="Remarks Here ..." 
			value={remarksVal.overallRemark} 
			onChange={(value:string)=>setRemarksVal({...remarksVal, overallRemark:value})}
			style={{width:'700' ,height:'100px', marginBottom: '12px'}} />
                 <div className={styles.button}>
                  <Button size="md" themeType="secondary" style={{marginRight:'8px'}} onClick={()=>{setApprove(false)}} >No</Button>
                  <Button size="md" style={{marginRight:'8px'}} disabled ={!(remarksVal.overallRemark.length > 0)}onClick={()=>handleApproveAndReject()}>Yes</Button>
                </div>
             </Modal.Body>
             
        </Modal>}
</div>

)
}
export default Header