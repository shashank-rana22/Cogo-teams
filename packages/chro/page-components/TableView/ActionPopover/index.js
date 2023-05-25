import React from "react";
import styles from "./styles.module.css";
import { Popover, Button } from "@cogoport/components";
import SubmitSection from "./SubmitSection";
import { useState } from "react";
export default function ActionPopover({
  loading,
  finalReview,
  setFinalReview,
}) {
  const [visible, setVisible] = useState(false);

  const onCheck = () => {
    setVisible(() => !visible);
  };

  return (
    <div className={styles.popover_container}>
      <Popover
        placement="left"
        trigger="click"
        caret={false}
        visible={visible}
        render={
          <SubmitSection
            //   initialQuestion={initialQuestion}
            //   ctcStructure={ctcStructure}
            setVisible={setVisible}
            //   formProps={formProps}
            //   setShowCtcBreakupModal={setShowCtcBreakupModal}
            //   setInitialQuestion={setInitialQuestion}
            // loading={loading}
            // finalReview={finalReview}
            // setFinalReview={setFinalReview}
          />
        }
      >
        <Button themeType="secondary" onClick={onCheck}>
          Reject
        </Button>
      </Popover>
    </div>
  );
}
