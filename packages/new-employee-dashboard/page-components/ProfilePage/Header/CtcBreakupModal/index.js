import { Modal, Button, Popover } from "@cogoport/components";
import React from "react";
import ModalComponent from "../ModalComponent";
import { useState } from "react";
import SubmitSection from "./SubmitSection";
import styles from "./styles.module.css";

export default function CtcBreakupModal({
  showCtcBreakupModal,
  setShowCtcBreakupModal,
  ctcStructure,
  initialQuestion,
  setInitialQuestion,
  formProps,
}) {
  const [visible, setVisible] = useState(false);

  const onClose = () => {
    setShowCtcBreakupModal(false);
    setInitialQuestion("");
  };

  const onCheck = () => {
    setVisible(() => !visible);
  };

  return (
    <Modal
      size="xl"
      show={showCtcBreakupModal}
      onClose={onClose}
      placement="center"
    >
      <Modal.Header title="Set CTC Values" />
      <Modal.Body>
        <ModalComponent
          ctcStructure={ctcStructure}
          initialQuestion={initialQuestion}
          setInitialQuestion={setInitialQuestion}
          formProps={formProps}
        />
      </Modal.Body>
      <Modal.Footer>
        <div className={styles.popover_container}>
          <Popover
            placement="top"
            trigger="click"
            caret={false}
            visible={visible}
            render={
              <SubmitSection
                initialQuestion={initialQuestion}
                ctcStructure={ctcStructure}
                setVisible={setVisible}
                formProps={formProps}
                setShowCtcBreakupModal={setShowCtcBreakupModal}
                setInitialQuestion={setInitialQuestion}
              />
            }
          >
            <Button onClick={onCheck}>Submit</Button>
          </Popover>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
