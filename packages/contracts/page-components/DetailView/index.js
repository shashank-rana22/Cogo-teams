import { useSelector } from "@cogoport/store";

import useGetContract from "../../hooks/useGetContract";
import useUpdateContract from "../../hooks/useUpdateContract";

import Body from "./Body";
import Header from "./Header";
import Loader from "./Loader";
import useGetContractStats from "../../hooks/useGetContractStats";

function DetailView() {
  const { query } = useSelector(({ general }) => ({
    query: general?.query,
  }));
  const { data, loading, getContract } = useGetContract({ id: query?.id });
  const { updateContract, loading: loadingUpdate } = useUpdateContract();

  const handleUpdateContract = async (val) => {
    await updateContract({
      payload: {
        id: query?.id,
        status: val,
      },
    });
  };

  const { data: statsData, getContractStats } = useGetContractStats({
    id: query?.id,
  });

  let content = <Loader />;

  if (data?.id && !loading) {
    content = (
      <>
        {" "}
        <Header
          data={data}
          status={query?.status}
          handleUpdateContract={handleUpdateContract}
          statsData={statsData}
          loadingUpdate={loadingUpdate}
        />
        <Body
          data={data}
          statsData={statsData}
          status={query?.status}
          getContract={getContract}
          getContractStats={getContractStats}
        />
      </>
    );
  }

  return <div>{content}</div>;
}

export default DetailView;
