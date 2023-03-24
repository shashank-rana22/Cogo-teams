import { Select, TabPanel, Tabs, Toggle } from "@cogoport/components";
import tabs from '../../configs/tabs.json';

import styles from './styles.module.css';
import ScopeAndFilter from "../ScopeAndFilter";

const importExportParams = {
    placeholder: 'Trade Type',
    isClearable: true,
    options: [{label: 'Export', value:'export'},{label:'Import', value:'import'}],
}

export default function TabsAndFilters({activeTab, setActiveTab, filters, setFilters}){
    importExportParams.onChange = (val) => {
        if(val && val !== filters.trade_type){
            setFilters({...filters, trade_type: val})
        }
    }
    importExportParams.value = filters.trade_type;

    return <div className={styles.container} >
            <Tabs
                themeType="primary"
                activeTab={activeTab}
                onChange={(val) => { console.log('tab', val); setActiveTab(val)}}
            >
                {tabs.map((tab) => <TabPanel {...tab} />)}
            </Tabs>

            <div className={styles.filter_container} >
                <ScopeAndFilter filters={filters} setFilters={setFilters} />
                <Select {...importExportParams} />
                <Toggle size="md" offLabel="Critical SIDs" />
            </div>
        </div>
}