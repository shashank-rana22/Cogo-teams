import { Tooltip } from "@cogoport/components";
import React from "react";

interface itemTypes {
    organizationName?: string;
    createdBy: string;
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
    const { organizationName = "", createdBy, buyerDetails } = item || {};

    const { businessName = "" } = buyerDetails || {};

    return (
        <div>
            {field?.key === "organizationName" && (
                <div>
                    {organizationName.length > 18 ? (
                        <Tooltip
                            interactive
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

            {field?.key === "createdBy" && (
                <div>
                    {createdBy?.length > 10 ? (
                        <Tooltip
                            interactive
                            placement="top"
                            content={createdBy}
                        >
                            <text>{`${createdBy?.substring(0, 10)}...`}</text>
                        </Tooltip>
                    ) : (
                        <text>{createdBy}</text>
                    )}
                </div>
            )}
        </div>
    );
};

export default ModifiedName;
