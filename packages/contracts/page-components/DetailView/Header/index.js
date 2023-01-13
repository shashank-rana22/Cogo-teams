import { IcMArrowBack } from "@cogoport/icons-react";
import { useRouter } from "@cogoport/next";

import Stats from "./Stats";
import styles from "./styles.module.css";

function Header({
  data,
  status,
  handleUpdateContract,
  statsData,
  loadingUpdate,
}) {
  const router = useRouter();
  return (
    <div>
      <div className={styles.heading}>
        <IcMArrowBack
          style={{ cursor: "pointer" }}
          onClick={() => {
            router.push("/contracts");
          }}
        />
        <div className={styles.head}>Back to Contracts</div>
      </div>
      <div className={styles.contract}>Contract Details</div>
      <Stats
        data={data}
        status={status}
        handleUpdateContract={handleUpdateContract}
        statsData={statsData}
        loadingUpdate={loadingUpdate}
      />
    </div>
  );
}

export default Header;
