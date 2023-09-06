import React, { useState } from 'react';
import { Tags } from '@cogoport/components';
import { IcMFtick } from '@cogoport/icons-react';
import TechStatus from './TechStatus';

import styles from './styles.module.css';

function TechClearanceConfirm() {
    const options=[
        {
            key      : '1',
            disabled : false,
            children : 'Completed',
            prefix   : null,
            suffix   : null,
            color    : '#849E4C',
            tooltip  : false,
        },
    ]
    const [items, setItems] = useState(options);

	return (
			
            <div>
                <div className={styles.container}>
                    <div className={styles.sub_container}>
                        <div className={styles.title}>Handover takeover Clearance</div>
                        <div className={styles.sub_heading}>Please read carefully</div>
                    </div>

                <Tags items={items} onItemsChange={setItems} size="xl" className={styles.completed}  />

            </div>

                <div className={styles.completed_notification_container}>

                    <IcMFtick height="18px" width="18px" color="#849E4C"/>

                    <div className={styles.completed_notification_text}>
                    You have successfully completed your tasks. No further changes are allowed
                    </div>

                </div>
                <TechStatus />
            </div>
	);
}

export default TechClearanceConfirm;