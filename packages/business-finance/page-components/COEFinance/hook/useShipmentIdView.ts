import { useRequest, useRequestBf } from "@cogoport/request";
import React, { useEffect } from "react";

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
    activeJobs?: string;
    pendingApproval?: string;
}

const useShipmentIdView = (allParams?: any) => {
    const { ...params }: AllParams = allParams || {};
    const { authorizationparameters } = useSelector(
        ({ profile }: UseSelectorProps) => ({
            authorizationparameters: profile?.authorizationparameters,
        })
    );

    const [{ data: shipmentData, loading: apiLoading, error }, trigger] =
        useRequest(
            {
                url: "list_shipments",
                method: "get",
            },
            { autoCancel: false }
        );

    const [{ loading: statsLoading, data: statsData }, statsTrigger] =
        useRequestBf(
            {
                url: "/purchase/bills/stats",
                method: "get",
                authkey: "get_purchase_bills_stats",
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

    const handleStats = async () => {
        try {
            await statsTrigger();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        handleStats();
    }, []);

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
        handleStats();
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
        statsData,
        statsLoading,
        apiLoading,
    };
};

export default useShipmentIdView;
