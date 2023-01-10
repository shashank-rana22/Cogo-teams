import { Button } from "@cogoport/components";
import { IcCFtick, IcMCrossInCircle } from "@cogoport/icons-react";
import React, { useState } from "react";
import LineItemCard from "./lineItemCard/index";
import styles from './styles.module.css'
import { Modal, Textarea ,Checkbox} from '@cogoport/components'
import {RemarksValInterface} from '../../../../../commons/Interfaces/index'

interface BuyerDetailInterface {
    entityCode?:string
    organizationName?:string
    address?:string
    registrationNumber?:string
    taxNumber?:string
}

interface SellerDetailInterface {
    organizationName?:string
    registrationNumber?:string
    taxNumber?:string
}

interface SellerBankDetailInterface {
    bankName?:string
    accountNumber?:string
    ifscCode?:string
}

interface BillInterface {
    billNumber?:string
    billDate?:string
    status?:string
    placeOfSupply?:string
}

interface DataInterface {
    lineItems?:Array<object>
    buyerDetail?:BuyerDetailInterface
    sellerBankDetail?:SellerBankDetailInterface
    sellerDetail?:SellerDetailInterface
    bill?:BillInterface
}

interface ShipmentDetailsCardInterface{
    data?:DataInterface
    remarksVal:RemarksValInterface
    setRemarksVal:any
    lineItemsRemarks:object 
    setLineItemsRemarks: React.Dispatch<React.SetStateAction<{}>>
    setItemCheck:  React.Dispatch<React.SetStateAction<boolean>>
    setLineItem:React.Dispatch<React.SetStateAction<boolean>>
}

const ShipmentDetailsCard = ({data,remarksVal,setRemarksVal, lineItemsRemarks, setLineItemsRemarks ,setItemCheck,setLineItem}:ShipmentDetailsCardInterface) =>{
    const [showValue, setShowValue ] = useState([] as any)
    const [rejected,setRejected] = useState([] as any)
    const [showLineItem , setShowLineItem] = useState(false)
    const [showRejected , setShowRejected] = useState({})
    const {lineItems } = data || {}
    const {buyerDetail , sellerBankDetail , sellerDetail , bill} = data || {}
    const {entityCode ='' , organizationName:organizationNameBuyer ='', address ='' , registrationNumber:registrationNumberBuyer ='', taxNumber:taxNumberBuyer ='' } = buyerDetail || {}
    const {organizationName =''  , registrationNumber ='',taxNumber ='' } = sellerDetail || {}
    const {bankName ='' , accountNumber ='' , ifscCode =''}  = sellerBankDetail || {}
    const {billNumber ='' , billDate ='' ,status ='' ,placeOfSupply =''} = bill || {}


    const [ DetailsCard, setDetailsCard ] = useState([
        {id :1, name:'billing-details', label:'Bank Details - Collection Party'},
        {id :2, name:'billing-party', label:'Billing Party'},
        {id :3, name:'invoice-details', label:'Invoice Details'},
    ] as any);


    const handleClick = (id:number) => { 
        const approveData = [...showValue,id]  
        setShowValue(approveData) 
        DetailsCard.push(DetailsCard.shift())
        setDetailsCard(DetailsCard)
    }

    const handleRejected = (id:number)=>{
        setRejected([...rejected,id]);
        DetailsCard.push(DetailsCard.shift())
        setDetailsCard(DetailsCard)
    }

    const handleClickUndo = (id:number) => {
       const undoApprovedData = showValue.filter((item:any) => item !== id);
       setShowValue(undoApprovedData);
       const undoRejectedData = rejected.filter((item:any) => item !== id);
       setRejected(undoRejectedData);

    //    Removing remarks of selected card on Undo here 
          if(id===1){
              setRemarksVal({...remarksVal,collectionPartyRemark:''})
          }else if(id===2){
            setRemarksVal({...remarksVal,billingPartyRemark:''})
          }else if(id===3){
            setRemarksVal({...remarksVal,invoiceDetailsRemark:''})
          }
    }

    const handleClickReject =(id:number) => {
        setShowRejected((previousActions:any) => ({
			...previousActions,
			[id]: !previousActions[id],
		}));
    }

    const onClose = () => {
        if(Object.keys(showRejected).includes('1')){
            setRemarksVal({...remarksVal,collectionPartyRemark:'' });
        }else if(Object.keys(showRejected).includes('2')){
            setRemarksVal({...remarksVal,billingPartyRemark:'' });
        }else{
            setRemarksVal({...remarksVal,invoiceDetailsRemark:'' });
        }
		setShowRejected(false);
	};

    const onSubmit=()=>{
        const current = Object.keys(showRejected)?.[0];
        handleRejected(+current);
        setShowRejected(false);
    }
    const handleSave = () =>{
        setShowLineItem(true)
        setItemCheck(true)
    }

return(
    <div>
{ showLineItem ? <LineItemCard 
                  lineItems={lineItems} 
                  setShowLineItem={setShowLineItem} 
                  setRemarksVal={setRemarksVal} 
                  lineItemsRemarks={lineItemsRemarks}
                  setLineItemsRemarks={setLineItemsRemarks}
                  remarksVal={remarksVal} 
                  setLineItem={setLineItem}
                  /> : 
    <div>
        <div className={styles.mainHeader}>
            <div className={styles.instructions}>
                Check the Details  ( As filled by SO2 in the cogo form )
            </div>
            
            <div className={styles.completed}>
                Completed {(showValue.length + rejected.length) || 0}/3
            </div>
        </div>

{  DetailsCard.map((itemData:any) => {
        
        const {id , label = ''} = itemData || {}
        
return(
    <>
        {
            showRejected[id as keyof typeof showRejected] &&                 
                <Modal size="lg" show={showRejected[id as keyof typeof showRejected]} onClose={onClose}>
                    <Modal.Header title="CHOOSE THE DETAiLS YOU WANT TO REJECT" />
                    <Modal.Body>
                        {Object.keys(showRejected).includes("1") &&
                                            <div>
                                                <div style={{display:'flex',alignItems:'center'}}>
                                                   <Checkbox/>
                                                   <div>Name</div>
                                                </div>

                                                <div style={{display:'flex',alignItems:'center'}}>
                                                   <Checkbox/>
                                                   <div>Bank Name </div>
                                                </div>


                                                <div style={{display:'flex',alignItems:'center'}}>
                                                   <Checkbox/>
                                                   <div>Account Number </div>
                                                </div>

                                                <div style={{display:'flex',alignItems:'center'}}>
                                                   <Checkbox/>
                                                   <div>IFSC</div>
                                                </div>


                                                <div style={{display:'flex',alignItems:'center'}}>
                                                   <Checkbox/>
                                                   <div>PAN Number</div>
                                                </div>

                                                <div style={{display:'flex',alignItems:'center'}}>
                                                   <Checkbox/>
                                                   <div>GST Number </div>
                                                </div>
                                                 
                                                <Textarea
                                                 name="remark" 
                                                 size="md" 
                                                 placeholder="Remarks Here ..." 
                                                 style={{width:'700' ,height:'100px'}}
                                                 value={remarksVal.collectionPartyRemark} 
                                                 onChange={(value:string)=>setRemarksVal({...remarksVal, collectionPartyRemark:value})} 
                                                 />
                                               
                                            </div>

                            }

                        {Object.keys(showRejected).includes("2")&&     
                                            <div>
                                                <div style={{display:'flex',alignItems:'center'}}>
                                                   <Checkbox/>
                                                   <div>Entity</div>
                                                </div>

                                                <div style={{display:'flex',alignItems:'center'}}>
                                                   <Checkbox/>
                                                   <div>Address</div>
                                                </div>

                                                <div style={{display:'flex',alignItems:'center'}}>
                                                   <Checkbox/>
                                                   <div>PAN Number </div>
                                                </div>

                                                <div style={{display:'flex',alignItems:'center'}}>
                                                   <Checkbox/>
                                                   <div>GST Number</div>
                                                </div>

                                                <Textarea
                                                 name="remark" 
                                                 size="md"
                                                 placeholder="Remarks Here ..."
                                                 value={remarksVal.billingPartyRemark} 
                                                 onChange={(value:string)=>setRemarksVal({...remarksVal, billingPartyRemark:value})}
                                                 style={{width:'700' ,height:'100px'}} />
                                            </div>
                            }
                        {Object.keys(showRejected).includes("3") &&
                                    <div>
                                                <div style={{display:'flex',alignItems:'center'}}>
                                                   <Checkbox/>
                                                   <div>Invoice Number</div>
                                                </div>

                                                <div style={{display:'flex',alignItems:'center'}}>
                                                   <Checkbox/>
                                                   <div>Invoice Date</div>
                                                </div>

                                                <div style={{display:'flex',alignItems:'center'}}>
                                                   <Checkbox/>
                                                   <div>Status</div>
                                                </div>

                                                <div style={{display:'flex',alignItems:'center'}}>
                                                   <Checkbox/>
                                                   <div>Place Of Supply</div>
                                                </div>

                                            <Textarea 
                                            name="remark" 
                                            size="md" 
                                            placeholder="Remarks Here ..." 
                                            value={remarksVal.invoiceDetailsRemark} 
                                            onChange={(value:string)=>setRemarksVal({...remarksVal, invoiceDetailsRemark:value})}
                                            style={{width:'700' ,height:'100px'}} />
                                    </div>
                            }
                        </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={onSubmit}>Submit</Button>
                    </Modal.Footer>
                </Modal>
        }

        {id === 1 &&
            <div className={styles.container } >
                 <div className={styles.headerContainer}>
                     <div className={showValue.includes(1) ? styles.labelApproved : (rejected.includes(1) ? styles.labelRejected:styles.label)}>
                             {label}
                         <div style={{justifyContent:'center',display:'flex'}} >
                             {showValue.includes(1)  ? <IcCFtick height="17px" width="17px" /> : (rejected.includes(1) ? <IcMCrossInCircle height="17px" width="17px"/>:null)}
                         </div>
                     </div>
 
                    {
                     (showValue.includes(1) || rejected.includes(1))  ? 
                     <div className={styles.buttonContainer} onClick={()=>{handleClickUndo(id)}}>
                         <Button size='sm' themeType="secondary">Undo</Button>
                     </div> :         
                     <div className={styles.buttonContainer}>
                         <Button size='sm'  themeType="secondary" onClick={()=>{handleClick(id)}}>Approve</Button>
                         <Button  size='sm' themeType="secondary" style={{border:'1px solid #ed3726'}} onClick={()=>{handleClickReject(id)}}>Reject</Button>
                     </div>
                    } 
            
                 </div>
                 <div className={styles.hr}/>

                      <div className={styles.billingPartyContainer}>
                        <div style={{marginBottom:'8px'}}>Name - <span>{organizationName}</span></div>
                        <div style={{marginBottom:'8px'}}> Bank Name - <span>{bankName}</span></div>
                        <div style={{marginBottom:'8px'}}> Account Number - <span style={{color:"#ed3726"}} >{accountNumber}</span></div>
                        <div style={{marginBottom:'8px'}}> IFSC - <span style={{color:"#ed3726"}}>{ifscCode}</span></div>
                        <div style={{marginBottom:'8px'}}>PAN Number - <span>{registrationNumber}</span></div>
                        <div style={{marginBottom:'8px'}}>GST Number - <span>{taxNumber}</span></div>
                      </div>
            </div>
                   
                   }

{id === 2 &&
        <div className={styles.container } >
                <div className={styles.headerContainer}>
                    <div className={showValue.includes(2) ? styles.labelApproved : (rejected.includes(2) ? styles.labelRejected:styles.label)}>
                            {label}
                        <div style={{justifyContent:'center',display:'flex'}} >
                        {showValue.includes(2)  ? <IcCFtick height="17px" width="17px" /> : (rejected.includes(2) ? <IcMCrossInCircle height="17px" width="17px"/>:null)}
                        </div>
                    </div>

                   {
                    (showValue.includes(2) || rejected.includes(2))  ? 
                    <div className={styles.buttonContainer} onClick={()=>{handleClickUndo(id)}}>
                        <Button size='sm' themeType="secondary">Undo</Button>
                    </div> :         
                    <div className={styles.buttonContainer}>
                        <Button size='sm'  themeType="secondary" onClick={()=>{handleClick(id)}}>Approve</Button>
                        <Button  size='sm' themeType="secondary" style={{border:'1px solid #ed3726'}} onClick={()=>{handleClickReject(id)}} >Reject</Button>
                    </div>
                   } 
           
                </div>

                <div className={styles.hr}/>

                      <div className={styles.billingPartyContainer}>
                        <div style={{marginBottom:'8px'}}>Entity - <span style={{fontWeight:'600'}}>{entityCode}</span> - <span style={{fontWeight:'600'}}>{organizationNameBuyer}</span></div>
                        <div style={{marginBottom:'8px'}}>Address - <span>{address}</span></div>
                        <div style={{marginBottom:'8px'}}>PAN Number - <span>{registrationNumberBuyer}</span></div>
                        <div style={{marginBottom:'8px'}}>GST Number - <span>{taxNumberBuyer}</span></div>
                      </div>
        </div>
    }

{id === 3 &&
    <div className={styles.container } >
         <div className={styles.headerContainer}>
             <div className={showValue.includes(3) ? styles.labelApproved : (rejected.includes(3) ? styles.labelRejected:styles.label)}>
                     {label}
                 <div style={{justifyContent:'center',display:'flex'}} >
                 {showValue.includes(3)  ? <IcCFtick height="17px" width="17px" /> : (rejected.includes(3) ? <IcMCrossInCircle height="17px" width="17px"/>:null)}
                 </div>
             </div>

            {
             (showValue.includes(3) || rejected.includes(3)) ? 
             <div className={styles.buttonContainer} onClick={()=>{handleClickUndo(id)}}>
                 <Button size='sm' themeType="secondary">Undo</Button>
             </div>   :         
             <div className={styles.buttonContainer}>
                 <Button size='sm'  themeType="secondary" onClick={()=>{handleClick(id)}}>Approve</Button>
                 <Button  size='sm' themeType="secondary" style={{border:'1px solid #ed3726'}} onClick={()=>{handleClickReject(id)}}>Reject</Button>
             </div>
            } 
    
         </div>

         <div className={styles.hr}/>
                <div className={styles.billingPartyContainer}>
                        <div style={{marginBottom:'8px'}}>Invoice Number - <span>{billNumber}</span></div>
                        <div style={{marginBottom:'8px'}}>Invoice Date - <span>{billDate}</span></div>
                        <div style={{marginBottom:'8px'}}>Status - <span>{status}</span></div>
                        <div style={{marginBottom:'8px'}}>Place Of Supply - <span>{placeOfSupply}</span></div>
                </div>

        </div>
}
            
    </>
            )
        })}

    <div className={styles.footer}>
        <Button size='md' disabled ={showValue.length + rejected.length == 3 ? false : true} onClick={()=>handleSave()} >Save And Next</Button>
    </div>
    
   </div>

   }
</div> 
)
    
}
export default ShipmentDetailsCard