import React from "react";
import { Button } from "@cogoport/components";
import styles from "./styles.module.css";
import usePostCreateEmployeeOfferLetter from "../../usePostCreateEmployeeOfferLetter";

export default function SubmitSection({
  initialQuestion = "",
  ctcStructure = {},
  setVisible = () => {},
  formProps,
  setShowCtcBreakupModal = () => {},
  setInitialQuestion = () => {},
}) {
  const { handleSubmit, reset } = formProps;

  const { loading, onFinalSubmit } = usePostCreateEmployeeOfferLetter();
  const onSubmit = (values) => {
    onFinalSubmit(values, ctcStructure, initialQuestion);

    setVisible(false);
    // setShowCtcBreakupModal(false);
    setInitialQuestion("");
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className={styles.popover_inner}>
      <h4>Are you sure?</h4>
      <div className={styles.sumbit}>
        <Button
          className={styles.button_submit}
          themeType="secondary"
          onClick={onClose}
        >
          No
        </Button>

        <Button
          className={styles.button_submit}
          themeType="primary"
          onClick={handleSubmit(onSubmit)}
          loading={loading}
        >
          Yes
        </Button>
      </div>
    </div>
  );
}
