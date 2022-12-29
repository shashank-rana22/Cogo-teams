import { Button } from "@cogoport/components";
import React, { useState } from "react";
import styles from './styles.module.css'
import { LINE_ITEMS } from "../../../../../configurations/LINE_ITEMS";
import List from "../../../../../../commons/List/index";
import { IcCFtick ,IcMOverflowDot,IcCRedCircle} from "@cogoport/icons-react";


const LineItemCard = ({ lineItems , setShowLineItem=()=>{}}) => {
    const [popoverOpen, setPopoverOpen] = useState(false)
    const [radio , setRadio ] = useState(false)
    const [popover, setPopover] = useState(false)

    const renderBody = () => {
        if(popover){
            setRadio(false)
            return <IcCRedCircle width="17px" height="17px" />
        }
        if(radio){
            setPopover(false)
            return <IcCFtick width="17px" height="17px" /> 
        }

        return  <div className={styles.circle} />
    };
    console.log(popover,"popover");
    console.log(radio,"radio");
    console.log(popoverOpen,"popoverOpen");
    console.log(lineItems,"lineItems");
    
    
    
    const functions = {
        renderIcon: ()=>(
            <div className={styles.circleBig} onClick={()=>{setRadio(!radio)}} >
            {renderBody()}
            </div>
                
           
        ),
        
        renderReject: () => (
            <div className={styles.rejected} onClick={()=>{setPopoverOpen(!popoverOpen)}} >
                {popoverOpen && <div className={styles.popoverRejected} onClick={()=>{setPopover(!popover)}}>Reject Line Item </div>}
                <IcMOverflowDot width="20px" height="20px"/>
            </div>
            
        )
      };

    return(
        <div className={styles.container}>
                <List config={LINE_ITEMS} itemData={{list:lineItems}} functions={functions} />

            <div className={styles.footer}>
                <Button size='md'  onClick={()=>{setShowLineItem(false)}}> Go Back </Button>
            </div>
        </div>
     
    )
}
export default LineItemCard