import React ,{useState}from "react";
import styles from './styles.module.css';
import { Tags } from "@cogoport/components";
import {IcMArrowRotateDown,IcMArrowRotateUp,IcADocumentTemplates} from '@cogoport/icons-react'
import Details from "./Details/index";
import Documents from "./Documents/index";
import ShipmentDetailsCard from "./ShipmentDetailsCard/index";
import PdfDisplay from "./PdfDisplay/index";
import POC from './../POC';
import useListShipment from "../../../hook/useListShipment";

const ShipmentDetails = ({data,orgId,jobNumber})=>{
    const[showDetails,setShowDetails] = useState(false)
    const[showDocuments,setShowDocuments] = useState(false)

    const {data:shipmentData} = useListShipment(jobNumber);
    const shipmentId = shipmentData?.list[0]?.id;

    return(
    <div className={styles.container}>
             <h3>Shipment Details</h3>

            <div className={styles.smallHr} />

        <div className={styles.card}>
            <div className={styles.cardUpper} onClick={()=>{setShowDetails(!showDetails)}}>
                <div className={styles.subContainer}>
                    Details 
                    <div className={styles.tagsContainer}>
                        <Tags themeType="blue" size="md">Sell without buy</Tags>
                        <Tags themeType="blue" size="md">Export</Tags>
                    </div>
                    <div>Wallet Usage - USD 50</div>
                </div>

               <div className={styles.caret} onClick={()=>{setShowDetails(!showDetails)}}>
                  {showDetails ? <IcMArrowRotateUp height="17px" width="17px"/> : <IcMArrowRotateDown height="17px" width="17px"/> }
               </div>      
            </div>
            {showDetails && <div className={styles.hr}/>}
            <div className={styles.details}>{showDetails && <Details  jobNumber={jobNumber} orgId={orgId}/>}</div>
        </div>

        <div className={styles.card} onClick={()=>{setShowDocuments(!showDocuments)}}>
            <div className={styles.cardUpper}>
                <div className={styles.subContainer}>
                    Documents
                    <IcADocumentTemplates height="17px" width="17px"/>          
                </div>

               <div className={styles.caret} onClick={()=>{setShowDocuments(!showDocuments)}}>
                  {showDocuments ? <IcMArrowRotateUp height="17px" width="17px"/> : <IcMArrowRotateDown height="17px" width="17px"/> }
               </div>
            </div> 
            {showDocuments && <div className={styles.hr}/>}
            <div className={styles.documents}> { showDocuments && <Documents data={data}  shipmentId={shipmentId}/> } </div>               
        </div>
        {/* <POC/> */}

        <div className={styles.shipmentDetailsFooter}>
            <div className={styles.pdfDisplay}>
                <PdfDisplay data={data}/>
            </div>
            <div className={styles.shipmentDetailsCard}>
                <ShipmentDetailsCard data={data}/>
            </div>
        </div>
        
    </div>
    )
}
export default ShipmentDetails