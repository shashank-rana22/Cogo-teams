import { Button } from "@cogoport/components";
import React, { useEffect, useState } from "react";
import styles from './styles.module.css'
import { LINE_ITEMS ,LINE_ITEMS_CHECK} from "../../../../../configurations/LINE_ITEMS";
import List from "../../../../../../commons/List/index";
import { IcCFtick ,IcMOverflowDot,IcCFcrossInCircle} from "@cogoport/icons-react";
import { Popover ,Modal,Checkbox } from "@cogoport/components";
import { Textarea } from "@cogoport/components";

interface LineItemCard {
    lineItems:Array<object>
    setShowLineItem: React.Dispatch<React.SetStateAction<boolean>>
    setRemarksVal:any,
    lineItemsRemarks:object 
    setLineItemsRemarks: React.Dispatch<React.SetStateAction<{}>>
    remarksVal:object|{}
    setLineItem:React.Dispatch<React.SetStateAction<boolean>>
    isInvoiceApproved:boolean
}

const LineItemCard = ({ lineItems , setShowLineItem=()=>{}, setRemarksVal,lineItemsRemarks,setLineItemsRemarks, remarksVal,setLineItem, isInvoiceApproved}:LineItemCard) => {
    const [approvedItems , setApprovedItems ] = useState({})
    const [popover, setPopover] = useState(false);
    const [rejectedItems, setRejectedItems]=useState({});
    const [activeLineItem, setActiveLineItem] = useState(0);
    const [showRejectedModal , setShowRejectedModal] = useState({ id : "",name:''})

    const renderAction =(id:string)=>{
        if(approvedItems[id as keyof typeof approvedItems] || isInvoiceApproved){
           return  <IcCFtick width="17px" height="17px" /> 
        }
        if(rejectedItems[id as keyof typeof rejectedItems]){
            return <IcCFcrossInCircle width="17px" height="17px" />
        }
        return <div className={styles.circle} />
    } 

    const ApproveCheck = Object.values(approvedItems).filter((item)=> item === true).length
    
    const RejectCheck = Object.keys(rejectedItems).length

    useEffect(()=>{
        if(lineItems?.length === ApproveCheck + RejectCheck){
            setLineItem(true)
        }
        else if(lineItems?.length !== ApproveCheck + RejectCheck){
            setLineItem(false)
        }
    },[ApproveCheck,RejectCheck])
    
    
    const handleApproveClick = (key = '',name='') => { 
		setApprovedItems((previousActions:any) => ({
			...previousActions,
			[key]: !previousActions[key],
		}));
        setRejectedItems((p)=>{
            delete p[key as keyof typeof p];
           return {...p};
       });
       setLineItemsRemarks((prev)=>{
           delete prev[name as keyof typeof prev];
           return {...prev};
       });
	};

    const openRejectModal  =(item:any) => {
        setActiveLineItem(item?.name);
        setShowRejectedModal(item);
        setPopover((previousActions:any) => (
            {
			...previousActions,
			[item?.id]: !previousActions[item?.id],
		}));
    }

    const handleRejectClick =(key:string='') => {
        setRejectedItems((p:any)=>{
            return {
                ...p,
                [key]: true
            }
        });
        setApprovedItems((p)=>{
             delete p[key as keyof typeof p];
            return {...p};
        });
		setPopover(false);
    }


    const onClose = () => {
		setPopover(false);
	};

    const functions = {
        renderIcon: (item:any)=>(     
            <div className={styles.circleBig} onClick={()=>{handleApproveClick(item?.id, item?.name)}} >
            {renderAction(item?.id)}
            </div>
        ),
        renderReject: (item:any) => {
            return (
            <div style={{cursor:"pointer"}}>
               {!isInvoiceApproved && <Popover  placement="left"  render={<div className={styles.popoverRejected} onClick={()=>{openRejectModal(item)}} >{popover[item?.id as keyof typeof popover] ?  <div>Undo</div>  : <div>Reject Line Item</div> }</div>}>
                    <div> <IcMOverflowDot width="20px" height="20px"/> </div> 
                </Popover>}
            </div>
        )}
      };
     
      const { id, name:lineItemName } = showRejectedModal;
      
      const handleLineItemsRemarks=(val:string)=>{
          setLineItemsRemarks({...lineItemsRemarks,[activeLineItem]:val});
    }

    return(
    <div>
     
        <div className={styles.mainHeader}>
            <div style={{fontWeight:'500'}}> 
                  Check off Line Items and Tax Rate ( As filled by SO2 in the cogo form )
            </div>
               <div className={styles.smallHr} />
            {!isInvoiceApproved && <div className={styles.headerDetail}>
                Click  <IcMOverflowDot/>   To reject line item
            </div>}
        </div>

        <div className={styles.container}>
                <List config={LINE_ITEMS} itemData={{list:lineItems}} functions={functions} />

             <div className={styles.outer}>
                 <div className={styles.flex}>
                 <div className={styles.flexDiv}>
                    <div className={styles.info}>T: Taxable</div> 
                    <div className={styles.info}>P: Pure Agent</div> 
                    <div className={styles.info}>E: Exempted</div> 
                    <div className={styles.info}>N: Nil Rated</div> 
                    <div className={styles.info}>NG: Non GST</div> 
                    <div className={styles.info}>R: Reverse Charge</div>
                 </div>

                 <div className={styles.amount}>[value]</div>
                 <div className={styles.amountRight}>[value]</div>
                 </div>

                 <div className={styles.flex}>
                    <div className={styles.bottomDiv}>
                        <div>Total payable in words : </div>
                        <div>------</div>
                    </div>
                        <div className={styles.bottomDiv}>
                        <div>Total payable in words : </div>
                        <div>------</div>
                    </div>
                 </div>
             </div>
            
            <div className={styles.footer}>
                <Button size='md'  onClick={()=>{setShowLineItem(false)}}> Go Back </Button>
            </div>
            {
            popover[id as keyof typeof popover] && 
                <Modal size="lg" placement="center" show={popover[id]} onClose={onClose}>
                    <Modal.Header title="Rejected line items" />
            <Modal.Body>
                  <div className={styles.modalContainer}>
                        <List config={LINE_ITEMS_CHECK} itemData={{list:[showRejectedModal]}} functions={functions} />
                    </div>

                    <div style={{display:'flex',justifyContent:'center'}}>
                   
                </div>
                <Textarea 
                  name="remark" 
                  size="md" 
                  placeholder="Remarks Here ..." 
                  style={{width:'700' ,height:'100px'}}
                  onChange={(val:string)=>handleLineItemsRemarks(val)}
                  />
            </Modal.Body>


                    
                    <Modal.Footer>
                        <Button
                         onClick={()=>handleRejectClick(id)}
                         disabled={ !lineItemsRemarks[lineItemName as keyof typeof lineItemsRemarks] || (lineItemsRemarks[lineItemName as keyof typeof lineItemsRemarks] as Array<string>).length<0}
                         >Submit</Button>
                    </Modal.Footer>
                </Modal>
            }
      
        </div>
    </div> 
    )
}
export default LineItemCard