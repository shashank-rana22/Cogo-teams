import { useState } from "react";

import useUpdateContractService from "../../../hooks/useUpdateContractService";
import formatPortPair from "../../../utils/formatPortPair";

import Main from "./Main";
import SideBar from "./SideBar";
import styles from "./styles.module.css";

function Body({ data, statsData, getContract, status, getContractStats }) {
  const formattedData = formatPortPair({ item: data });

  const [activePair, setActivePair] = useState(formattedData[0]);

  const { updateContractService } = useUpdateContractService({
    getContract,
    getContractStats,
  });
  const handleUpdateContractServicer = ({ payload }) => {
    updateContractService({ payload });
  };
  return (
    <div className={styles.body}>
      <SideBar
        data={formattedData}
        activePair={activePair}
        setActivePair={setActivePair}
        handleUpdateContract={handleUpdateContractServicer}
        statsData={statsData}
        status={status}
      />
      <div className={styles.big_line} />
      <Main
        activePair={activePair}
        handleUpdateContract={handleUpdateContractServicer}
        data={data}
        status={status}
        statsData={statsData}
      />
    </div>
  );
}

export default Body;
