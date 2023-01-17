import { useRequestBf } from "@cogoport/request";
import { useState, useEffect } from "react";
import  PURCHASE_VIEW_CONFIG  from "../configurations/PURCHASE_VIEW_LIST";
import useDebounceQuery from "../../../../../common/forms/hooks/useDebounceQuery";
import { GenericObject, NestedObj } from "../../commons/Interfaces/index";
import { format } from "@cogoport/utils";


interface Props {
    filters: GenericObject;
    setFilters: (p: object) => void;
    sort: NestedObj;
}

const useGetPurchaseViewList = ({ filters, setFilters, sort }: Props) => {
    const [currentTab, setCurrentTab] = useState("INITIATED");
    const { debounceQuery, query } = useDebounceQuery();
    const [searchValue, setSearchValue] = useState("");
    

    const showFilter = () => {
        if (filters?.billType === "PURCHASE") {
            return "BILL";
        } else if (filters?.billType === "PROFORMA") {
            return "BILL";
        } else if (filters?.billType === "CREDIT_NOTE") {
            return "CREDIT_NOTE";
        } else if (filters?.billType === "REIMBERSEMENT") {
            return "REIMBERSEMENT";
        }
        return undefined;
    };

    const showbillType =
        filters?.billType === "PURCHASE" ? false : undefined;
    const showProforma = filters?.billType === "PROFORMA" ? true : undefined;

    
const billDatesFilters=
    filters?.billDate && format(filters?.billDate,"yyyy-MM-dd'T'HH:mm:sso",{},false);
const dueDatesFilters=
    filters?.dueDate && format(filters?.dueDate,"yyyy-MM-dd'T'HH:mm:sso",{},false);
const updatedDateFilters=
    filters?.updatedDate && format(filters?.updatedDate,"yyyy-MM-dd'T'HH:mm:sso",{},false);



    const [{ data, loading, error }, refetch] = useRequestBf(
        {
            url: "/purchase/bills/list",
            method: "get",
            params: {
                ...filters,
                dueDate: dueDatesFilters|| undefined,
                billDate: billDatesFilters || undefined,
                updatedDate:updatedDateFilters|| undefined,
                urgencyTag: filters?.urgencyTag || undefined,
                billType: showFilter(),
                proforma: showbillType || showProforma,
                status:
                    currentTab !== "all" && currentTab !== "Urgency_tag"
                        ? currentTab
                        : undefined,
                isUrgent: currentTab === "Urgency_tag" ? true : undefined,
                ...sort,
                pageSize:10,
            },
            authKey: "get_purchase_bills_list",
        },
        { manual: false }
    );

    useEffect(() => {
        debounceQuery(searchValue);
    }, [searchValue]);

    useEffect(() => {
        setFilters((prev: GenericObject) => ({
            ...prev,
            q: query || undefined,
            pageIndex: 1,
            pageSize: 10,
        }));
    }, [query]);

    useEffect(() => {
        refetch();
    }, [sort]);

    const config = PURCHASE_VIEW_CONFIG;

    return {
        data,
        loading,
        config,
        currentTab,
        setCurrentTab,
        setSearchValue,
        searchValue,
    };
};

export default useGetPurchaseViewList;
