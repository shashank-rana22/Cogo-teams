import React from "react";
import { Button } from "@cogoport/components";
import styles from "./styles.module.css";

export default function SubmitSection({ setVisible = () => {}, formProps }) {
  const onSubmit = () => {
    console.log("okok");
  };
  const onClose = () => {
    setVisible(false);
  };

  const { handleSubmit } = formProps;
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
        >
          Yes
        </Button>
      </div>
    </div>
  );
}
