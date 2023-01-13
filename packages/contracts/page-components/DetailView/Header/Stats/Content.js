import { Button } from "@cogoport/components";

import Line from "../../../../common/Line";
import Percentage from "../../../../common/MiniCard/Percentage";
import Price from "../../../../common/MiniCard/Price";
import formatPortPair from "../../../../utils/formatPortPair";
import styles from "./styles.module.css";

function Content({
  handleUpdateContract,
  statsData,
  data,
  loadingUpdate,
  status,
}) {
  const formattedData = formatPortPair({ item: data });

  let counter = 0;
  formattedData.forEach((item) => {
    if (item?.status === "quoted") {
      counter = counter + 1;
    }
  });

  return (
    <div className={styles.main_container}>
      <div className={styles.information}>
        {/* {statsData?.projected_consolidated_profitability
					? ( */}
        {/* <> */}
        <>
          <Percentage data={statsData?.projected_consolidated_profitability} />
          <Line />
        </>
        {/* </> */}
        {/* ) : null} */}
        <>
          <Price data={statsData?.projected_consolidated_revenue} />
          <Line />
        </>
        {/* <Margin /> */}
      </div>
      {status === "pending_approval" ? (
        <div className={styles.button_container}>
          <Button
            themeType="accent"
            size="md"
            onClick={() => {
              handleUpdateContract("active");
            }}
            disabled={formattedData.length <= counter || loadingUpdate}
          >
            FINISH JOB
          </Button>
          {formattedData.length <= counter ? (
            <div className={styles.pending}>
              Pending: {`${counter}/${formattedData.length}`}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
export default Content;
