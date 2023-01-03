import { Button } from "@cogoport/components";
import { IcCFtick } from "@cogoport/icons-react";
import React, { useState } from "react";
import LineItemCard from "./lineItemCard/index";
import styles from './styles.module.css'
import { Modal, Textarea ,Checkbox} from '@cogoport/components'

const ShipmentDetailsCard = ({data}:any) =>{
    const [showValue, setShowValue ] =  useState([])
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
    ]);


    const handleClick = (id:number) => { 
        const approveData = [...showValue,id]  
        setShowValue(approveData) 
        DetailsCard.push(DetailsCard.shift())
        setDetailsCard(DetailsCard)
    }

    const handleClickUndo = (id:number) => {
       const undoData = showValue.filter(item => item !== id)
       setShowValue(undoData)
    }

    const handleClickReject =(id:number) => {
        setShowRejected((previousActions) => ({
			...previousActions,
			[id]: !previousActions[id],
		}));

    }

    const onClose = () => {
		setShowRejected(false);
	};
    

return(
    <div>


{ showLineItem ? <LineItemCard lineItems={lineItems} setShowLineItem={setShowLineItem}/> : 
    <div>
        <div className={styles.mainHeader}>
            <div style={{fontWeight:'600'}}>
                Check the Details  ( As filled by SO2 in the cogo form )
            </div>
            
            <div style={{fontWeight:'600'}}>
                Completed {showValue.length  || 0}/3
            </div>
        </div>

{  DetailsCard.map((itemData) => {
        
        const {id , label = ''} = itemData || {}
        
return(
    <>

        {
            showRejected[id] &&                 
                <Modal size="lg" show={showRejected[id]} onClose={onClose}>
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
                                                 
                                                <Textarea name="remark" size="md" placeholder="Remarks Here ..." style={{width:'700' ,height:'100px'}} />
                                               
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

                                                <Textarea name="remark" size="md" placeholder="Remarks Here ..." style={{width:'700' ,height:'100px'}} />
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

                                            <Textarea name="remark" size="md" placeholder="Remarks Here ..." style={{width:'700' ,height:'100px'}} />
                                    </div>
                            }
                        </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={onClose}>Submit</Button>
                    </Modal.Footer>
                </Modal>
        }

        {id === 1 &&
            <div className={styles.container } >
                 <div className={styles.headerContainer}>
                     <div className={showValue.includes(1) ? styles.labelApproved : styles.label}>
                             {label}
                         <div style={{justifyContent:'center',display:'flex'}} >
                             {showValue.includes(1)  && <IcCFtick height="17px" width="17px" />}
                         </div>
                     </div>
 
                    {
                     (showValue.includes(1))  ? 
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
                    <div className={showValue.includes(2)  ? styles.labelApproved : styles.label}>
                            {label}
                        <div style={{justifyContent:'center',display:'flex'}} >
                            {showValue.includes(2)  && <IcCFtick height="17px" width="17px" />}
                        </div>
                    </div>

                   {
                    showValue.includes(2)  ? 
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
             <div className={showValue.includes(3)   ? styles.labelApproved : styles.label}>
                     {label}
                 <div style={{justifyContent:'center',display:'flex'}} >
                     {showValue.includes(3)   && <IcCFtick height="17px" width="17px" />}
                 </div>
             </div>

            {
             showValue.includes(3) ? 
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
        <Button size='md' disabled ={showValue.length == 3 ? false : true} onClick={()=>{setShowLineItem(true)}} >Save And Next</Button>
    </div>
    
   </div>

   }
</div> 
)
    
}
export default ShipmentDetailsCard