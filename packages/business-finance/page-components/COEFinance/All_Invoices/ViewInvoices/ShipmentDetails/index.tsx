import React ,{useState}from "react";
import styles from './styles.module.css';
import { Tags } from "@cogoport/components";
import {IcMArrowRotateDown,IcMArrowRotateUp,IcADocumentTemplates} from '@cogoport/icons-react'
import Details from "./Details/index";
import Documents from "./Documents/index";
import ShipmentDetailsCard from "./ShipmentDetailsCard/index";
import PdfDisplay from "./PdfDisplay/index";
import POC from './POC/index';
import useListShipment from "../../../hook/useListShipment";
import useGetVariance from "../../../hook/useGetVariance";
import { Button } from "@cogoport/components";
import VarianceView from "./VarianceView/index";

interface JobInterface {
    jobNumber:string

}

interface BillAdditionalObjectInterface {
    collectionPartyId:string
}
interface DataInterface {
    job:JobInterface
    bill :object
    billAdditionalObject : BillAdditionalObjectInterface
}
interface ShipmentDetailsInterface {
    data:DataInterface
    orgId?:string
    
}
const ShipmentDetails = ({data,orgId}:ShipmentDetailsInterface)=>{
    const[showDetails,setShowDetails] = useState(false)
    const[showDocuments,setShowDocuments] = useState(false)
    const [showVariance, setShowVariance] = useState(false);
    const { job } = data || {}
    const {  jobNumber } = job || {};
    const collectionPartyId = data?.billAdditionalObject?.collectionPartyId;
    const { varianceFullData, loading } = useGetVariance({ collectionPartyId });
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
            <div className={styles.details}>{showDetails && <Details orgId={orgId}/>}</div>
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
            <div className={styles.documents}> { showDocuments && <Documents  shipmentId={shipmentId}/> } </div>               
        </div>

        <div style={{display:'flex',justifyContent:'space-between', alignItems: 'center'}}>
        {collectionPartyId ? (
				<div className={styles.variance} >
					<div>
						VARIANCE -{' '}
						{loading
							? 'Getting...'
							: `${varianceFullData?.currency}${' '}
					${varianceFullData?.total_variance}`}
					</div>
					<div
						className={styles.viewMore}
						onClick={() => setShowVariance(true)}
					>
						View More
					</div>
				</div>
			) : null}
            <POC itemData={data}/>
        </div>

        {showVariance ? (
				<VarianceView
					show={showVariance}
					onClose={() => setShowVariance(false)}
					data={varianceFullData}
				/>
			) : null}
        

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