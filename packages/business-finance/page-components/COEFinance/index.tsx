import React,{useState} from "react"
import {TabPanel,Tabs} from '@cogoport/components'
import styles from './styles.module.css';
import AllInvoices from "./All_Invoices/index";
import MyResponsiveBar from "./Components/ResponsiveBar";
import MyResponsiveLine from "./Components/Stream";
import MyResponsiveLines from "./Components/linecharts";
import data from "./Components/ResponsiveBar/data";
import lineData from "./Components/Stream/data";
const CoeFinance=()=>{
    const [activeTab, setActiveTab] = useState('dashboard');
    return(
    <div>
        <div>
			<h1>COE Finance</h1>
		</div>
    <Tabs activeTab={activeTab} onChange={setActiveTab}>
     
        <TabPanel className={styles.tab_panel_dashboard} name="dashboard" title="Dashboard" >
        <div style={{width: 680,height:360}}>
                <MyResponsiveBar data={data}/>
        </div>
        <div style={{ height: 360 ,width: 680}}>
        <MyResponsiveLine data={lineData}/>
        </div>
        <div style={{ height: 360 ,width: 680}}>
        <MyResponsiveLines data={{}}/>
        </div>
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