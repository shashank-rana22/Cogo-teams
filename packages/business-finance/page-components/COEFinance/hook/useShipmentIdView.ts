import { useRequest, useRequestBf } from "@cogoport/request";
import React, { useEffect, useState } from "react";

import { useSelector } from "@cogoport/store";
import useGetFiniteList from "./useGetFiniteList";

type dataType = {
    currentPage: number;
    restFilters: any;
};
interface Profile {
    authorizationparameters?: string;
}

interface UseSelectorProps {
    profile?: Profile;
}

interface AllParams {
    jobs?: string;
    pending_approval?: string;
}

const useShipmentIdView = (allParams?: {}) => {
    const { ...params }: AllParams = allParams || {};
    const { authorizationparameters } = useSelector(
        ({ profile }: UseSelectorProps) => ({
            authorizationparameters: profile?.authorizationparameters,
        })
    );

    const [{ data: shipmentData, loading: apiLoading }, trigger] = useRequest(
        {
            url: "list_shipments",
            method: "get",
        },
        { autoCancel: false }
    );

    const listAPi = (restFilters: dataType, currentPage: dataType) => {
        const allFilters = {
            ...(restFilters || {}),
            ...allParams,
            state: [
                "confirmed_by_importer_exporter",
                "in_progress",
                "completed",
                "cancelled",
            ],
        };

        const finalFiletrs: any = {};
        Object.keys(allFilters).forEach((filter) => {
            if (allFilters[filter]) {
                finalFiletrs[filter] = allFilters[filter];
            }
        });
        return trigger({
            params: {
                filters: finalFiletrs,
                summary_data_required: true,
                manifest_data_required: true,
                revenue_desk_data_required: true,
                page_limit: 10,
                page: currentPage,
            },
        });
    };

    const {
        loading,
        page,
        filters,
        list: { data, total, total_page, fullResponse },
        hookSetters,
        refetch,
    } = useGetFiniteList(listAPi, {
        ...(params || {}),
        authorizationparameters,
    });

    const handleRefetch = () => {
        refetch();
    };

    return {
        loading: loading || apiLoading,
        page,
        filters,
        list: {
            data,
            total,
            total_page,
            fullResponse,
        },
        hookSetters,
        refetchList: refetch,
        refetch: handleRefetch,
    };
};

export default useShipmentIdView;
