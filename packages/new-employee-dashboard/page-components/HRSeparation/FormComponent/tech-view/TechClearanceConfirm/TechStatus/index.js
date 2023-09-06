import React, { useState } from 'react';
import { IcMArrowDown, IcMFtick } from '@cogoport/icons-react';
import { Button, Checkbox } from '@cogoport/components';
import { startCase } from '@cogoport/utils';


import styles from './styles.module.css';

function TechStatus() {
  const [show, setShow] = useState(false);
   
  const STATUS_CONFIRMED = {
		cloud_service   : 'Access Removed',
		atlassian       : 'Access Removed',
    github          : 'Access Removed',
    Figma           : 'Access Removed',
	};


  return (
    <div className={styles.container}>
        
            <div className={styles.heading} aria-hidden onClick={() => setShow(!show)}>
                <span>
                    Status
                </span>
                <div className={styles.button_add_service_container}>
                   
                    <IcMArrowDown
                        width={16}
                        height={16}
                        className={show ? styles.caret_active : styles.caret_arrow}
                    />
                </div>
            </div>
         <div className={ show ? styles.item_container : styles.item_container_closed}>
              {Object.keys(STATUS_CONFIRMED || {}).map((val) => (
				      	<div className={styles.detail} key={val.key}>
					    	  <div className={styles.label}>
							      {startCase(val) || '-'}
						      </div>
                  <div className={styles.status_detail}>
                  <IcMFtick height={18} width={18} color="#849E4C"/>
                  {STATUS_CONFIRMED[val] || '-'}
						    </div>
					</div>
				))}
         </div>
    </div>
  )
}

export default TechStatus;