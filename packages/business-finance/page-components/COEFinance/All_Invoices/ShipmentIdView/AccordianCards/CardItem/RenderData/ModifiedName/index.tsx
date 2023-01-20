import { Tooltip } from "@cogoport/components";
import styles from "./styles.module.css";
import React from "react";

interface itemTypes {
    organizationName?: string;
    createdByName: string;
    buyerDetails?: businessNameTypes;
}

interface businessNameTypes {
    businessName: string;
}

interface propsType {
    item: itemTypes;
    field: any;
}

const ModifiedName = ({ item, field }: propsType) => {
    const { organizationName = "", createdByName, buyerDetails } = item || {};

    const { businessName = "" } = buyerDetails || {};

    return (
        <div className={styles.text}>
            {field?.key === "organizationName" && (
                <div>
                    {organizationName.length > 10 ? (
                        <Tooltip
                            interactive
                            placement="top"
                            content={organizationName}
                        >
                            <text>{`${organizationName.substring(
                                0,
                                10
                            )}...`}</text>
                        </Tooltip>
                    ) : (
                        <text>{organizationName}</text>
                    )}
                </div>
            )}

            {field?.key === "businessName" && (
                <div>
                    {businessName.length > 10 ? (
                        <Tooltip
                            interactive
                            placement="top"
                            content={businessName}
                        >
                            <text>{`${businessName.substring(0, 10)}...`}</text>
                        </Tooltip>
                    ) : (
                        <text>{businessName}</text>
                    )}
                </div>
            )}

            {field?.key === "createdByName" && (
                <div>
                    {createdByName?.length > 10 ? (
                        <Tooltip
                            interactive
                            placement="top"
                            content={createdByName}
                        >
                            <text>{`${createdByName?.substring(
                                0,
                                10
                            )}...`}</text>
                        </Tooltip>
                    ) : (
                        <text>{createdByName || " --"}</text>
                    )}
                </div>
            )}
        </div>
    );
};

export default ModifiedName;
