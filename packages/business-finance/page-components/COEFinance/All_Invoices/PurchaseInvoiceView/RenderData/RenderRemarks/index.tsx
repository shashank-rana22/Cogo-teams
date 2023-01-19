import React from 'react';
import { Popover, Tooltip } from '@cogoport/components';
import { IcMProvision } from '@cogoport/icons-react'; 
import { format } from "@cogoport/utils";
import { startCase } from '@cogoport/utils';
import styles from './styles.module.css'

interface itemProps {
    remarksTimeline?:Array<{billStatus:string,remark:string,createdAt:Date}>
}
interface Props{
    item:itemProps;
}

const RenderRemarks = ({ item }:Props) => {
    
    const remarkData = item?.remarksTimeline;

    const remarkTimeline = () => {
        return (remarkData || []).map((item, idx) => {
            const StatusItem = item?.billStatus?.toLowerCase();
            return (
                <div className={styles.timeline_wrapper}>
                    <div className={styles.left_content}>
                        {format(item?.createdAt, "dd/MMM/yyyy",null,false)}
                        <div>{format(item?.createdAt, " hh:mm a",null,false)}</div>
                    </div>
                    <div className={styles.path}>
                        <div className={styles.circle} />
                        {idx !== (remarkData || []).length - 1 ? (
                            <div className={styles.line} />
                        ) : null}
                    </div>

                    <div className={styles.right_content}>
                        <div className={styles.status_content}>
                            {startCase(StatusItem)}{" "}
                        </div>
                        <div>{item?.remark}</div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div>
            <Popover placement="top" render={remarkData?remarkTimeline():'no remark found !!'}>
                <div className={styles.remarksDiv}>
                <IcMProvision width="20px" height="20px" color="#F68B21" />
                </div>
            </Popover>
        </div>
    );
};

export default RenderRemarks;
