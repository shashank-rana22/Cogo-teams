import { Button } from "@cogoport/components";
import React, { useState } from "react";
import styles from './styles.module.css'
import { LINE_ITEMS ,LINE_ITEMS_CHECK} from "../../../../../configurations/LINE_ITEMS";
import List from "../../../../../../commons/List/index";
import { IcCFtick ,IcMOverflowDot,IcCFcrossInCircle} from "@cogoport/icons-react";
import { Popover ,Modal,Checkbox } from "@cogoport/components";
import { Textarea } from "@cogoport/components";

interface LineItemCard {
    lineItems?:Array<object>
    setShowLineItem: React.Dispatch<React.SetStateAction<boolean>>
}


const LineItemCard = ({ lineItems , setShowLineItem=()=>{}}:LineItemCard) => {
    const [radio , setRadio ] = useState(false)
    const [popover, setPopover] = useState(false)
    const [showRejectedModal , setShowRejectedModal] = useState({ id : ""})

    const renderAction =(id:string)=>{
        if(radio[id as keyof typeof radio]){
           return  <IcCFtick width="17px" height="17px" /> 
        }
        if(popover[id as keyof typeof popover]){
            
            return <IcCFcrossInCircle width="17px" height="17px" />
        }
        return <div className={styles.circle} />
    }

    
    const handleApproveClick = (key = '') => {   
		setRadio((previousActions:any) => ({
			...previousActions,
			[key]: !previousActions[key],
		}));
	};

    const handleRejectClick =(item:any) => {
        setShowRejectedModal(item)
        setPopover((previousActions:any) => ({
			...previousActions,
			[item?.id]: !previousActions[item?.id],
		}));
    }


    const onClose = () => {
		setPopover(false);
	};

    const functions = {
        renderIcon: (item:any)=>(       
            <div className={styles.circleBig} onClick={()=>{handleApproveClick(item?.id)}} >
            {renderAction(item?.id)}
            </div>
        ),
        renderReject: (item:any) => (
            <div style={{cursor:"pointer"}}>
                <Popover  placement="left" interactive render={<div className={styles.popoverRejected} onClick={()=>{handleRejectClick(item)}} >{popover[item?.id as keyof typeof popover] ?  <div>Undo</div>  : <div>Reject Line Item</div> }</div>}>
                    <div> <IcMOverflowDot width="20px" height="20px"/> </div> 
                </Popover>
            </div>
        )
      };
     
      const { id } = showRejectedModal;


    return(
    <div>
     
        <div className={styles.mainHeader}>
            <div style={{fontWeight:'500'}}> 
                  Check off Line Items and Tax Rate ( As filled by SO2 in the cogo form )
            </div>
               <div className={styles.smallHr} />
            <div className={styles.headerDetail}>
                Click  <IcMOverflowDot/>   To reject line item
            </div>
        </div>

        <div className={styles.container}>
                <List config={LINE_ITEMS} itemData={{list:lineItems}} functions={functions} />

            <div className={styles.footer}>
                <Button size='md'  onClick={()=>{setShowLineItem(false)}}> Go Back </Button>
                <Button size='md'  onClick={()=>{}}> Save </Button>
            </div>
            {
            popover[id as keyof typeof popover] && 
                <Modal size="lg" placement="center" show={popover[id as keyof typeof popover]} onClose={onClose}>
                    <Modal.Header title="Rejected line items" />
            <Modal.Body>
                  <div className={styles.modalContainer}>
                        <List config={LINE_ITEMS_CHECK} itemData={{list:[showRejectedModal]}} functions={functions} />
                    </div>

                    <div style={{display:'flex',justifyContent:'center'}}>
                    {LINE_ITEMS_CHECK.fields.map((item) => {
                        
                        
                          return (
                                <div style={{display:'flex' , alignItems:"center",margin:'0px 8px'}}>
                                    <Checkbox value={item?.label}/>
                                    <div>{item?.label}</div>
                                </div>
                          )
                          
                    })}
                </div>
                <Textarea name="remark" size="md" placeholder="Remarks Here ..." style={{width:'700' ,height:'100px'}} />
            </Modal.Body>


                    
                    <Modal.Footer>
                        <Button onClick={onClose}>Submit</Button>
                    </Modal.Footer>
                </Modal>
            }
      
        </div>
    </div> 
    )
}
export default LineItemCard