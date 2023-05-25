import React from "react";
import { Button, Input, Textarea } from "@cogoport/components";
import styles from "./styles.module.css";
import { useState } from "react";


export default function SubmitSection({
  // initialQuestion = "",
  // ctcStructure = {},
  setVisible = () => {},
  // formProps,
  // setShowCtcBreakupModal = () => {},
  // setInitialQuestion = () => {},
  // loading = false,
  // finalReview = '',
  // setFinalReview = '',
}) {

    const [finalReview, setFinalReview] = useState("");





  // const { handleSubmit, reset } = formProps;

  // const { loading, onFinalSubmit } = usePostCreateEmployeeOfferLetter();
  // const onSubmit = (values) => {
  //   onFinalSubmit(values, ctcStructure, initialQuestion);

  //   setVisible(false);
  //   // setShowCtcBreakupModal(false);
  //   setInitialQuestion("");
  // };
  // const onClose = () => {
  //   setVisible(false);
  // };

  const onBack = () => {
    setVisible(false);
  };

  return (
    <div className={styles.popover_inner}>
      <div>
        <h4>Please provide a reason</h4>
        

        <Textarea
          value={finalReview}
          onChange={(e) => setFinalReview(e)}
          size="lg"
          placeholder="Provide Reason"
        />
      </div>

      <div
        style={{
          display: "flex",
          padding: "20px 0",
          justifyContent: "flex-end",
        }}
      >
        <Button
          className={styles.button_submit}
          themeType="secondary"
          onClick={onBack}
        >
          Go Back
        </Button>

        <Button
          className={styles.button_submit}
          themeType="primary"
          // onClick={handleSubmit(onSubmit)}
          // loading={loading}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
