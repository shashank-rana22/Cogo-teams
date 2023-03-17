import { useEffect, useCallback } from "react";
import { useSelector } from "@cogoport/store";
import { useRequest } from "@cogoport/request";

const useOceanRoute = ({ setMapPoints = () => {}, list = {} }) => {
  const { scope } = useSelector(({ general }) => ({
    scope: general?.scope,
  }));

  const [{ loading }, trigger] = useRequest({
    url: "/get_container_sea_route",
    method: "POST",
    scope,
  });

  const getAllOceanRoutes = useCallback(() => {(async () => {
    try {
      const container_no = list?.container_details?.map((c) => c?.container_no)
        .flat();
      const request_data = {
        saas_container_subscriptions: [
          {
            saas_container_subscription_id: list?.id,
            type: list?.type,
            container_no,
          },
        ],
      };
      console.log(request_data , " :request_data : ", list);
      const res = await trigger({ data: request_data });
      console.log(res , " :res");
      if (res.data?.length) {
        container_no?.forEach((c) => {
          const container = res?.data?.filter((r) => r.container_no === c);
          if (container.length > 0) {
            const test_points = container?.map((a) => a.data).flat();
            const pre_points = test_points.filter((point) => point);
            setMapPoints((prevPoints) => [
              ...prevPoints,
              {
                container_no: c,
                route: pre_points,
              },
            ]);
          }
        });
      }
      return res.data;
    } catch (err) {
      console.log(err)
      return [];
    }
  })();
}, [trigger]);

  useEffect(() => {
      getAllOceanRoutes();
  }, [getAllOceanRoutes]);

  return {
    routesLoading: loading,
  };
};

export default useOceanRoute;
