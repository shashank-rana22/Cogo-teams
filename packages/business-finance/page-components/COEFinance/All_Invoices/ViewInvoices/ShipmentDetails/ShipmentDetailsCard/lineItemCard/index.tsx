import { Button } from "@cogoport/components";
import React, { useState } from "react";
import styles from './styles.module.css'
import { LINE_ITEMS } from "../../../../../configurations/LINE_ITEMS";
import List from "../../../../../../commons/List/index";
import { IcCFtick ,IcMOverflowDot,IcCRedCircle} from "@cogoport/icons-react";
import { Popover } from "@cogoport/components";


const LineItemCard = ({ lineItems , setShowLineItem=()=>{}}) => {
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

    const renderRejectBody = () => (
          <div className={styles.popoverRejected} onClick={()=>{setPopover(!popover)}}>Reject Line Item </div> 
    );
    

    const handleClick = (key = '') => {
		setRadio((previousActions) => ({
			...previousActions,
			[key]: !previousActions[key],
		}));
		if (key === '4') getTimeLineDetailsApi();
	};
    
    const functions = {
        renderIcon: (item)=>(       
            <div className={styles.circleBig} onClick={()=>{handleClick(item)}} >
            {renderBody()}
            </div>
        ),
        
        renderReject: () => (
            <div style={{cursor:"pointer"}}>
                <Popover  placement="top_left" render={renderRejectBody}>
                      <IcMOverflowDot width="20px" height="20px"/>
                </Popover>
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