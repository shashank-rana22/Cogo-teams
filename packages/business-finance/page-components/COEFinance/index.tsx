import React, { useState, useEffect } from "react";
import { TabPanel, Tabs } from "@cogoport/components";
import styles from "./styles.module.css";
import { useRouter } from "@cogoport/next";
import AllInvoices from "./All_Invoices/index";
import MyResponsiveBar from "./Components/ResponsiveBar";
import MyResponsiveLine from "./Components/Stream";
import MyResponsiveLines from "./Components/linecharts";
import data from "./Components/ResponsiveBar/data";
import lineData from "./Components/Stream/data";
import SegmentedControl from "../commons/SegmentedControl";
const CoeFinance=()=>{
    const [currentTab, setCurrentTab] = useState('');
    const OPTIONS = [
		{
			label: 'Open Jobs',
			value: 'per_package',
		},
		{
			label: 'Closed Jobs',
			value: 'total_gross',
		},
	];
    const { push, query } = useRouter();

    const [activeTab, setActiveTab] = useState(query.active_tab || "dashboard");

    useEffect(() => {
        push(
            "/business-finance/coe-finance/[active_tab]",
            `/business-finance/coe-finance/${activeTab}`
        );
    }, [activeTab]);

    return (
    <div>
        <div>

			<h1>COE Finance</h1>
		</div>
    <Tabs activeTab={activeTab} onChange={setActiveTab}>
     
        <TabPanel className={styles.tab_panel_dashboard} name="dashboard" title="Dashboard" >
        <div className={styles.spacebetween}>
        <div style={{minWidth: "60%",height:368, background:"#ffffff", borderRadius: "8px", margin:"16px"}}>
        <MyResponsiveLine data={lineData}/>
        </div>
        <div style={{ height: 368 ,minWidth: "35%", background:"#ffffff",borderRadius: "8px", margin:"16px"}}>
        <MyResponsiveBar data={data}/>
        </div>
        </div>
        <div className={styles.spacebetween}>
        <div style={{background:"#ffffff",minWidth: "50%",height: 323, borderRadius: "8px", margin:"16px", padding:"16px"}}>
        <div className={styles.flex}>
            <div className={styles.heading}>
            Job Related Statistics
            </div>
            <SegmentedControl options={OPTIONS} activeTab={currentTab} setActiveTab={setCurrentTab} color={"#ED3726"} background={"#FFFAEB"}/>
        </div>
        <div className={styles.totalstats}>
        <div>
            <div className={styles.stat}>25</div>
            <div className={styles.month}>Current Month - March</div>
        </div>
        <div>
            <div className={styles.stat}>25</div>
            <div className={styles.month}>February</div>
        </div>
        <div>
            <div className={styles.stat}>25</div>
            <div className={styles.month}>January</div>
        </div>
        </div>
        </div>
        <div style={{ height: 323 ,minWidth: "45%" , background:"#ffffff",borderRadius: "8px", margin:"16px"}}>
        <MyResponsiveLines data={{}}/>
        </div>
        </div>
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

