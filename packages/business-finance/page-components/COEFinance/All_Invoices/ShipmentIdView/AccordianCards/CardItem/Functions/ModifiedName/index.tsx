import { Tooltip } from "@cogoport/components";
import React from "react";

interface itemTypes {
    billNumber?: string;
    organizationName?: string;
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
    const { organizationName = "", billNumber = "", buyerDetails } = item || {};

    const { businessName = "" } = buyerDetails || {};

    return (
        <div>
            {field?.key === "organizationName" && (
                <div>
                    {organizationName.length > 18 ? (
                        <Tooltip
                            interactive
                            theme="light"
                            placement="top"
                            content={organizationName}
                        >
                            <text>{`${organizationName.substring(
                                0,
                                15
                            )}...`}</text>
                        </Tooltip>
                    ) : (
                        <text>{organizationName}</text>
                    )}
                </div>
            )}

            {field?.key === "businessName" && (
                <div>
                    {businessName.length > 18 ? (
                        <Tooltip
                            interactive
                            theme="light"
                            placement="top"
                            content={businessName}
                        >
                            <text>{`${businessName.substring(0, 15)}...`}</text>
                        </Tooltip>
                    ) : (
                        <text>{businessName}</text>
                    )}
                </div>
            )}
        </div>
    );
};

export default ModifiedName;
