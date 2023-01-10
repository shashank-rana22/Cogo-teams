import { Popover } from "@cogoport/components";
import { IcMProvision } from "@cogoport/icons-react";
import { startCase } from "@cogoport/utils";
import React from "react";
import { formatDate } from "../../../../../../../commons/utils/formatDate";
import styles from "./styles.module.css";
interface itemTypes {
    remarksTimeline: any;
    remark?: string;
}

interface propsType {
    itemData: itemTypes;
}

const Remarks = ({ itemData }: propsType) => {
    const remarkData = itemData.remarksTimeline;

    const RemarksContent = () => {
        if (!itemData?.remark) {
            return <div>No Data</div>;
        }
        return (remarkData || []).map((item: any, idx: any) => {
            const StatusItem = item?.billStatus?.toLowerCase();
            return (
                <div className={styles.timeline_wrapper}>
                    <div className={styles.left_content}>
                        {formatDate(item?.createdAt, "dd-MMM-yy",{},true)}
                        <div>{formatDate(item?.createdAt, " hh:mm a",{},true)}</div>
                    </div>
                    <div className={styles.path}>
                        <div className={styles.circle} />
                        {idx !== remarkData?.length - 1 ? (
                            <div className={styles.line} />
                        ) : null}
                    </div>

                    <div className={styles.right_content}>
                        <div className={styles.status_content}>
                            {startCase(StatusItem)}
                        </div>
                        <div>{item?.remark}</div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div>
            <Popover placement="top" render={RemarksContent()}>
                <div>
                    <IcMProvision
                        height={20}
                        width={20}
                        color="#F68B21"
                        style={{ cursor: "pointer" }}
                    />
                </div>
            </Popover>
        </div>
    );
};

export default Remarks;
