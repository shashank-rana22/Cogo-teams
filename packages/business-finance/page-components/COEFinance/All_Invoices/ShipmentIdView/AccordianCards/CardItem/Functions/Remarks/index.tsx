import { Tooltip } from "@cogoport/components";
import { IcMProvision } from "@cogoport/icons-react";
import React from "react";
import RemarksContent from "./RemarksContent/index";
import styles from "./styles.module.css";
interface itemTypes {}

interface propsType {
    item: itemTypes;
}

const Remarks = ({ item }: propsType) => {
    return (
        <div>
            <Tooltip
                interactive
                theme="light"
                placement="left"
                content={<RemarksContent item={item} />}
            >
                <div>
                    <IcMProvision
                        height={20}
                        width={20}
                        color="#F68B21"
                        style={{ cursor: "pointer" }}
                    />
                </div>
            </Tooltip>
        </div>
    );
};

export default Remarks;
