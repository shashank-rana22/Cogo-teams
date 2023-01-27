import { Button } from "@cogoport/components";
import { useRouter } from "@cogoport/next";
import React, { useState } from "react";

import { GenericObject } from "../../../commons/Interfaces/index";
import List from "../../../commons/List/index";
import PURCHASE_VIEW_CONFIG from "../../configurations/PURCHASE_VIEW_LIST";
import useGetPurchaseViewList from "../../hook/usePurchaseViewList";

import { fieldProps } from "./interfaces/index";
import FieldPair from "./RenderData/FiledPair/index";
import FormatedDate from "./RenderData/FormatedDate/index";
import RenderCustomer from "./RenderData/RenderCustomer/index";
import RenderRemarks from "./RenderData/RenderRemarks/index";
import RenderRibbon from "./RenderData/RenderRibbon/index";
import RenderStatus from "./RenderData/RenderStatus/index";
import RenderUrgencyTag from "./RenderData/RenderUrgencyTag/index";
import RenderViewMoreButton from "./RenderData/RenderViewMoreButton/index";
import SegmentedFilters from "./SegmentedFilters/index";

interface ItemProps {
  createdDate: Date;
  billDate: Date;
  dueDate: Date;
  billCurrency: string;
  subTotal: number;
  grandTotal: number;
  status: string;
  billType: string;
  billDocumentUrl: string;
  serviceType: string;
  billNumber: string;
  isProforma: boolean;
  jobNumber: string;
  organizationName: string;
  urgencyTag: Array<string>;
  remarksTimeline?: Array<{
    billStatus: string;
    remark: string;
    createdAt: Date;
  }>;
}
interface Props {
  filters: GenericObject;
  setFilters: (p: object) => void;
  subActiveTab: string;
}

function PurchaseInvoice({ filters, setFilters, subActiveTab }: Props) {
  const router = useRouter();
  const [sort, setSort] = useState({});

  const {
    data,
    loading,
    setSearchValue,
    searchValue,
    currentTab,
    setCurrentTab,
  } = useGetPurchaseViewList({ filters, setFilters, sort });

  const functions: any = {
    renderStatus: (itemData: ItemProps) => <RenderStatus item={itemData} />,
    renderFieldPair: (itemData: ItemProps, field: fieldProps) => (
      <FieldPair itemData={itemData} field={field} />
    ),
    renderCustomer: (itemData: ItemProps, field: fieldProps) => (
      <RenderCustomer itemData={itemData} field={field} />
    ),
    rendeFormate: (itemData: ItemProps, field: fieldProps) => (
      <FormatedDate item={itemData} field={field} />
    ),
    renderRemarks: (itemData: ItemProps) => <RenderRemarks item={itemData} />,
    renderViewMore: (itemData: ItemProps) => (
      <RenderViewMoreButton itemData={itemData} />
    ),
    // renderRibbon: (itemData:ItemProps)=>(
    //   <RenderRibbon item={itemData} />
    // ),
    renderUrgencyTag: (itemData: ItemProps) => (
      <RenderUrgencyTag item={itemData} />
    ),
  };

  return (
    <div>
      <SegmentedFilters
        filters={filters}
        setFilters={setFilters}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <List
        config={PURCHASE_VIEW_CONFIG}
        itemData={data}
        functions={functions}
        loading={loading}
        sort={sort}
        setSort={setSort}
        page={filters.pageIndex || 1}
        handlePageChange={(pageValue: number) => {
          setFilters((p: GenericObject) => ({ ...p, pageIndex: pageValue }));
        }}
        subActiveTab={subActiveTab}
      />
    </div>
  );
}

export default PurchaseInvoice;
