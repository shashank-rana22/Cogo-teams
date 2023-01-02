import React from 'react'
import { Button } from '@cogoport/components'
import {useRouter} from '@cogoport/next'
import styles from "./styles.module.css"
import { Tags } from '@cogoport/components'
import StatRect from './StatRect'
import Line from './Line'
import DiscountRect from './DiscountRect'
import { Accordion } from '@cogoport/components'
import { IcADocumentTemplates, IcMArrowNext, IcMInfo } from '@cogoport/icons-react'
import { Select } from '@cogoport/components'
import CardHeader from './Card/CardHeader'
import { CardBody } from './Card/CardBody'
import useGetShipmentCostSheet from '../hook/useGetShipmentCostSheet'
import { GenericObject } from '../../commons/Interfaces'
import getFormattedPrice from '../../commons/utils/getFormattedPrice'

const CostSheet = () => {
  const Router=useRouter();
  const shipment_id=Router.query.orgId;
  const {data,loading}=useGetShipmentCostSheet({shipment_id});
  const{buy_quotation={}, sell_quotation={}}=data||{};
  const{service_charges: buyServicesCharges =[],net_total:netTotalPriceSell,net_total_price_currency:netTotalPriceCurrencySell,net_total_price_discounted:netTotalPriceDiscountedSell}=sell_quotation;
  const{service_charges: sellServicesCharges =[],net_total:netTotalPriceBuy,net_total_price_currency:netTotalPriceCurrencyBuy,net_total_price_discounted:netTotalPriceDiscountedBuy}=buy_quotation;
  

  return (
    <div>
    <div className={styles.flex}>
    <Button size="md" themeType="secondary" onClick={()=>Router.push('/business-finance/coe-finance/[active_tab]/[view]','/business-finance/coe-finance/all_invoices/shipment-view')}>Go Back</Button>
    <div className={styles.flexwidth}>
    <div>Status - </div>
    <Tags themeType='green' className={styles.tag}>Operationally Closed</Tags>
    <div className={styles.link} onClick={()=>{}}>Undo</div>
    <Button size="md" themeType="primary" onClick={()=>{}}>Close Financially</Button>
    </div>
    </div>
    <Line margin='20px 0px 0px 0px'/>
    <div className={styles.heading}>Profitability</div>
    <Line width="60px" color='#F68B21' margin='5px 0px 0px 0px'/>
    <div className={styles.statscontainer}>
    <StatRect heading="Profit on Shipment - Pre Tax" expected='6.91%' actual='5.44%'/>
    <StatRect heading="Profit on Shipment - Post Tax" expected='4.21%' actual='4.44%'/>
    <StatRect heading="Air Freight Service" expected='8.30%' actual='6.44%'/>
    </div>
    <DiscountRect heading='Discount Applied' statvalue='KAM - INR 30,000' statlabel='Revenue Desk - INR 30,000' />
    <Accordion type="text" title={<span className={styles.label}>Documents <span className={styles.icon}><IcADocumentTemplates/></span></span>} style={{ backgroundColor:"#FFFFFF", 
    borderRadius:'8px', margin:"25px 0px",
    boxShadow:'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px' }}>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
			condimentum, nisl eget aliquam tincidunt, nunc nisl aliquam
			ligula, eget aliquam nunc nisl sit amet nisl. Nulla facilisi.
		</Accordion>
    <Accordion type="text" title={<span className={styles.details}>Shipment Details <Tags themeType='green' className={styles.shipmentag}>Export</Tags></span>} style={{ backgroundColor:"#FFFFFF", 
    borderRadius:'8px', margin:"25px 0px",
    boxShadow:'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px' }}>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
			condimentum, nisl eget aliquam tincidunt, nunc nisl aliquam
			ligula, eget aliquam nunc nisl sit amet nisl. Nulla facilisi.
		</Accordion>
    <div className={styles.heading}>Cost Sheet</div>
    <Line width="60px" color='#F68B21' margin='5px 0px 0px 0px'/>
    <div className={styles.flexresponsive}>
    <div className={styles.displayflex}>
    <DiscountRect heading='Legends' statlabel={<span className={styles.displayflex}>Profit <span className={styles.profiticon}><IcMArrowNext height={20} width={20}/></span></span>} statvalue={<span className={styles.displayflex}>Loss <span className={styles.lossicon}><IcMArrowNext height={20} width={20}/></span></span>} marginTop='15px' width='320px' headingwidth='90px'/>
    <div className={styles.warning}><span className={styles.icon}><IcMInfo height={20} width={20}/></span>Check Incidental Charge</div>
    </div>
    <div className={`${styles.displayflex} ${styles.responsive}`}>
    <div className={styles.amountselect}>Show Amount in</div>
    <Select/>
    </div>
    </div>
    <div className={styles.flex}>
    <div className={styles.width}>
    <CardHeader header='Sell' value={getFormattedPrice(netTotalPriceSell||netTotalPriceDiscountedSell,
							netTotalPriceCurrencySell || 'INR')||'-'} />
    {buyServicesCharges.map((charge:GenericObject)=>(<CardBody charge={charge}/>))}
    </div>
    <div className={styles.width}>
    <CardHeader header='Buy' value={getFormattedPrice(netTotalPriceBuy||netTotalPriceDiscountedBuy,
							netTotalPriceCurrencyBuy || 'INR')||'-'}/>
    {sellServicesCharges.map((charge:GenericObject)=>(<CardBody charge={charge}/>))}
    </div>
    </div>
    </div>
  )
}

export default CostSheet