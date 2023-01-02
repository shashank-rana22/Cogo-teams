import { Button } from "@cogoport/components";
import React, { useState } from "react";
import styles from './styles.module.css'
import { LINE_ITEMS ,LINE_ITEMS_CHECK} from "../../../../../configurations/LINE_ITEMS";
import List from "../../../../../../commons/List/index";
import { IcCFtick ,IcMOverflowDot,IcCFcrossInCircle} from "@cogoport/icons-react";
import { Tooltip ,Modal,Checkbox } from "@cogoport/components";


const LineItemCard = ({ lineItems , setShowLineItem=()=>{}}) => {
    const [radio , setRadio ] = useState(false)
    const [popover, setPopover] = useState(false)
    const [showRejectedModal , setShowRejectedModal] = useState({})

    const renderAction =(id)=>{
        if(radio[id]){
           return  <IcCFtick width="17px" height="17px" /> 
        }
        if(popover[id]){
            
            return <IcCFcrossInCircle width="17px" height="17px" />
        }
        return <div className={styles.circle} />
    }

    
    const handleApproveClick = (key = '') => {   
		setRadio((previousActions) => ({
			...previousActions,
			[key]: !previousActions[key],
		}));
	};

    const handleRejectClick =(item) => {
        setShowRejectedModal(item)
        setPopover((previousActions) => ({
			...previousActions,
			[item?.id]: !previousActions[item?.id],
		}));
    }


    const onClose = () => {
		setShowRejectedModal(false);
	};
    
    const functions = {
        renderIcon: (item)=>(       
            <div className={styles.circleBig} onClick={()=>{handleApproveClick(item?.id)}} >
            {renderAction(item?.id)}
            </div>
        ),
        
        renderReject: (item) => (
            <div style={{cursor:"pointer"}}>
                <Tooltip  placement="left" interactive content={<div className={styles.popoverRejected} onClick={()=>{handleRejectClick(item)}}>{popover[item?.id] ?  <div>Undo</div>  : <div>Reject Line Item</div> }</div> }>
                      <IcMOverflowDot width="20px" height="20px"/>
                </Tooltip>
            </div>

        )
      };
     
      const { id } = showRejectedModal;


    return(
    <div>
     
        <div className={styles.mainHeader}>
            <div style={{fontWeight:'600'}}>
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
            popover[id] && 
                <Modal size="lg" show={popover[id]} onClose={onClose}>
                    <Modal.Header title="Rejected line items" />

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