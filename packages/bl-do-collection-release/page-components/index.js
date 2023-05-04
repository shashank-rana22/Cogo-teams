import { dynamic } from '@cogoport/next';
import { Tabs, TabPanel } from '@cogoport/components';
import FCL from './FCL';
import LCL from './LCL';
import FCLLocal from './FCL-Local';
import TAB_CONFIG from '../configs/TAB_CONFIG.json'
import { useState } from 'react';
import styles from './styles.module.css';

const CollectionDesk ={
  fcl_freight: dynamic(()=> import('./FCL'), {ssr: false}),
  lcl_freight: dynamic(()=> import('./LCL'), {ssr: false}),
  fcl_local: dynamic(()=> import('./FCL-Local'), {ssr: false}),
}
export default function BLDoCollectionDesk() {
  const [stateProps, setStateProps] = useState({
    activeTab: 'bl_collection',
    shipment_type: 'fcl_freight',
    filters: {}
  });

  const RenderTab = stateProps?.shipment_type in CollectionDesk 
  ? CollectionDesk[stateProps.shipment_type] 
  : null;
	return (
		<div className={styles.container}>
      <div className={styles.header}>BL/DO Collection</div>

      <Tabs
        activeTab={stateProps.activeTab}
        themeType="primary"
        onChange={(val)=> setStateProps({...stateProps, activeTab: val})}
        fullWidth
        >
          {
            TAB_CONFIG.LEVEL_1.map((item)=>{
              return(
                <TabPanel
                name={item.name}
                title={item.title}
                >
                <div className={styles.inner_tabs}>
                { item.name !=='stationary'?
                  <Tabs
                    activeTab={stateProps.shipment_type}
                    themeType="primary"
                    onChange={(val)=> setStateProps({...stateProps, shipment_type: val})}
                  >
                    {
                      TAB_CONFIG.LEVEL_2.map((shipmentType)=>{
                        return (
                          <TabPanel
                            name={shipmentType.name}
                            title={shipmentType.title}
                            >
                              <RenderTab/>
                            </TabPanel>
                        )
                      })
                    }
                  </Tabs>:
                  <div>Stationary Tab Component</div>
                  }
                  </div>
              </TabPanel>
              )
            })
          }    
        </Tabs>
    </div>
	);
}
