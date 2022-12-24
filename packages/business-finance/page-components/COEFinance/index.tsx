import React,{useState, useEffect} from "react";
import {TabPanel,Tabs} from '@cogoport/components';
import styles from './styles.module.css';
import {useRouter} from '@cogoport/next';
import AllInvoices from "./All_Invoices/index";
const CoeFinance=()=>{
    const { push, query } = useRouter();

    const [activeTab, setActiveTab] = useState(query.active_tab || 'dashboard');
     
    useEffect(()=>{
        push(
			'/business-finance/coe-finance/[active_tab]',
			`/business-finance/coe-finance/${activeTab}`,
		);
    },[activeTab])

    return(
    <div>
        <div>
			<h1>COE Finance</h1>
		</div>
    <Tabs activeTab={activeTab} onChange={setActiveTab}>
     
        <TabPanel className={styles.tab_panel_dashboard} name="dashboard" title="Dashboard" >
            dashboard
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