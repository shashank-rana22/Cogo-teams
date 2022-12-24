import React,{useState} from "react"
import {TabPanel,Tabs} from '@cogoport/components'
import styles from './styles.module.css';
import AllInvoices from "./All_Invoices/index";
const CoeFinance=()=>{
    const [activeTab, setActiveTab] = useState('dashboard');
    return(
    <div>
        <div>
			<h1>COE Finance</h1>
		</div>
    <Tabs activeTab={activeTab} onChange={setActiveTab}>
     
        <TabPanel className={styles.tab_panel_dashboard} name="dashboard" title="Dashboard" >
             <div>dashboard</div>
        </TabPanel>


        <TabPanel name="all_invoices" title="All Invoices">
            <AllInvoices/>
        </TabPanel>

        <TabPanel name="rejected" title="Rejected">
            <div>Rejected</div>
        </TabPanel>
    </Tabs>
    </div>
    )

}
export default CoeFinance