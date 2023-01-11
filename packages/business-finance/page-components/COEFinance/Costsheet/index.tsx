import React, { useEffect, useState } from 'react'
import { Button } from '@cogoport/components'
import {useRouter} from '@cogoport/next'
import styles from "./styles.module.css"
import StatRect from './StatRect'
import Line from './Line'
import DiscountRect from './DiscountRect'
import { Accordion } from '@cogoport/components'
import { IcADocumentTemplates, IcMArrowNext, IcMInfo } from '@cogoport/icons-react'
import { Placeholder } from '@cogoport/components'
import CardHeader from './Card/CardHeader'
import { CardBody } from './Card/CardBody'
import useGetShipmentCostSheet from '../hook/useGetShipmentCostSheet'
import { GenericObject } from '../../commons/Interfaces'
import getFormattedPrice from '../../commons/utils/getFormattedPrice'
import Documents from '../All_Invoices/ViewInvoices/ShipmentDetails/Documents'
import useListShipment from '../hook/useListShipment'
import Details from '../All_Invoices/ViewInvoices/ShipmentDetails/Details'
import useUpdateJob from '../hook/useUpdateJob'

const CostSheet = () => {
  const [showButton,setShowButton] = useState(false)
  const Router=useRouter();
  const {query}=Router||{};
  const {shipmentId:shipment_id,jobNumber,orgId}=query||{};
  const {selldata,buydata,apiloading,preTaxData,postTaxData,preTaxLoading,postTaxLoading,sellData,buyData}=useGetShipmentCostSheet({query});
  const{preTaxActual,preTaxExpected}=preTaxData||{}
  const{postTaxActual,postTaxExpected}=postTaxData||{}
  const {data:shipmentData} = useListShipment(jobNumber);
  const{total:buyTotal}=buyData||{};
  const{total:sellTotal}=sellData||{};


  const {getData ,getFinalData,FinalLoading, loading} = useUpdateJob({query})

  const handleOperationalClose =(e:any)=>{
    const data = e.target.innerText
    getData(data)
    setShowButton(!showButton)
  }
  
  return (
    <div>
    <div className={styles.flex}>
    <Button size="md" themeType="secondary" onClick={()=>Router.push('/business-finance/coe-finance/[active_tab]/[view]',
    '/business-finance/coe-finance/all_invoices/shipment-view' as never as null)}>Go Back</Button>
    <div className={styles.flexwidth}>

{showButton ? 
    <>
    <div>Status - </div>
    <div  className={styles.tag}>Operationally Closed</div>
    <div className={styles.link} onClick={(e)=>handleOperationalClose(e)}>Undo</div> 
    </> : 
    <Button size="md" themeType="primary" disabled={loading} onClick={(e)=>handleOperationalClose(e)}>Operationally Closed</Button>}
  
    <Button size="md" themeType="primary" disabled={!showButton || FinalLoading } onClick={()=>{getFinalData()}}>Close Financially</Button>
    </div>
    </div>
    <Line margin='20px 0px 0px 0px'/>
    <div className={styles.heading}>Profitability</div>
    <Line width="60px" color='#F68B21' margin='5px 0px 0px 0px'/>
    <div className={styles.statscontainer}>
    <StatRect heading="Profit on Shipment - Pre Tax" expected={preTaxExpected} actual={preTaxActual} loading={preTaxLoading}/>
    <StatRect heading="Profit on Shipment - Post Tax" expected={postTaxExpected} actual={postTaxActual} loading={postTaxLoading}/>
    </div>
    <DiscountRect heading='Discount Applied' statvalue='KAM - INR 30,000' statlabel='Revenue Desk - INR 30,000' />
    <Accordion type="text" title={<span className={styles.label}>Documents <span className={styles.icon}><IcADocumentTemplates/></span></span> as unknown as string} style={{ backgroundColor:"#FFFFFF", 
    borderRadius:'8px', margin:"25px 0px",
    }}>
			<Documents  shipmentId={shipment_id}/>
		</Accordion>
    <Accordion type="text" title={<span className={styles.details}>Shipment Details <div className={styles.shipmentag}>Export</div></span> as unknown as string} style={{ backgroundColor:"#FFFFFF", 
    borderRadius:'8px', margin:"25px 0px",
  }}>
			<Details orgId={orgId} dataList={shipmentData?.list?.[0]} shipmentId={shipment_id}/>
		</Accordion>
    <div className={styles.heading}>Cost Sheet</div>
    <Line width="60px" color='#F68B21' margin='5px 0px 0px 0px'/>
    <div className={styles.flexresponsive}>
    <div className={styles.displayflex}>
    <DiscountRect heading={<span className={styles.legends}>Legends</span>} statlabel={<span className={styles.displayflex}>Profit <span className={styles.profiticon}><IcMArrowNext height={20} width={20}/></span></span>} statvalue={<span className={styles.displayflex}>Loss <span className={styles.lossicon}><IcMArrowNext height={20} width={20}/></span></span>} marginTop='15px' width='320px' headingwidth='90px'/>
    <div className={styles.warning}><span className={styles.icon}><IcMInfo height={20} width={20}/></span>Check Incidental Charge</div>
    </div>
    </div>
    <div className={styles.flex}>
    <div className={styles.width}>
    <CardHeader header='Sell' value={getFormattedPrice(sellTotal, 'INR')||'-'} loading={apiloading}/>
    {apiloading&& [1,2,3,4].map(()=>(<Placeholder margin="20px" width='96%' height='220px'/>))}
    {!apiloading&&(selldata).map((charge:GenericObject)=>(<CardBody charge={charge}/>))}
    </div>
    <div className={styles.width}>
    <CardHeader header='Buy' value={getFormattedPrice(buyTotal,'INR')||'-'} loading={apiloading}/>
    {apiloading&& [1,2,3,4].map(()=>(<Placeholder margin="20px" width='96%' height='220px'/>))}
    {!apiloading&&(buydata).map((charge:GenericObject)=>(<CardBody charge={charge}/>))}
    </div>
    </div>
    </div>
  )
}

export default CostSheet