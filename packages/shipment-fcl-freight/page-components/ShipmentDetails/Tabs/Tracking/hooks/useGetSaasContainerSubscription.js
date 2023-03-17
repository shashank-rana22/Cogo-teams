import { useSelector } from "@cogoport/store";
import { useRequest } from "@cogoport/request";
import { useEffect, useCallback } from "react";
import getApiErrorString from "@cogoport/forms/utils/getApiError";
import { Toast } from "@cogoport/components";

const useGetSaasContainerSubscription = ({
  shipmentId = "",
  endPoint = "",
}) => {
  const { scope } = useSelector(({ general }) => ({
    scope: general?.scope,
  }));

  const [{ loading, data }, trigger] = useRequest({
    url: `get_saas_${endPoint}_subscription`,
    method: "GET",
    scope,
  },{ manual: true });

  const listShipments = useCallback(() => {
    (async () => {
      try {
        await trigger({
          params: {
            shipment_id: shipmentId,
          },
        });
        console.log(shipmentId, " :shipmentId");
      } catch (error) {
        Toast.error(getApiErrorString(error));
        console.log(error);
      }
    })();
	}, [trigger]);

  let apiData;
  if (endPoint === "container") {
    apiData = data;
  } else {
    const trackerData = data ?? {};
    const trackingContainersData = [
      {
        airway_bill_no: trackerData?.airway_bill_no,
        tracking_data: trackerData?.data,
      },
    ];
    apiData = {
      ...trackerData,
      data: trackingContainersData,
    };
  }

  useEffect(() => {
    listShipments();
  }, [listShipments]);

  return {
    loading,
    data: apiData,
  };
};

export default useGetSaasContainerSubscription;