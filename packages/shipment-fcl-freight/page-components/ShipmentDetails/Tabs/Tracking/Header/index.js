import { useState } from "react";
import { cl, Popover, Button, Select, Modal } from "@cogoport/components";
import RaiseQuery from "./RaiseQuery";
import { SelectController, TextAreaController } from "@cogoport/forms";
import useCreateRaiseQuery from "../hooks/useCreateRaiseQuery";
import controls from "./controls";
import styles from "./styles.module.css";

function Header({
  ContainerOptions = [],
  setContainerNo = () => {},
  containerNo = "",
  shipmentId = "",
  airwayBillNo = "",
  shipmentType = "fcl_freight",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { query_type, remarks } = controls;

  const { loading, handleFormSubmit, handleSubmit, reset, errors, control } =
    useCreateRaiseQuery({
      setShowModal,
      setIsOpen,
      shipmentId,
    });

  const content = (
    <form className={styles.content}>
      <div className={styles.label}>Issue Related to</div>
      <SelectController
        className={styles.select}
        control={control}
        {...query_type}
        rules={{
          required: {
            value: true,
          },
        }}
      />
      {errors?.query_type && (
        <div className={styles.error_text}>Query type is required</div>
      )}

      <div className={styles.text_area_container}>
        <div className={styles.label}>Remarks</div>
        <TextAreaController
          control={control}
          {...remarks}
          rules={{
            required: {
              value: true,
            },
          }}
          rows={4}
        />
        {errors?.remarks && (
          <div className={styles.error_text}>Remarks is required</div>
        )}
      </div>

      <div className={styles.button_div}>
        <Button
          onClick={() => {
            setIsOpen(false);
            reset();
          }}
          size="md"
          themeType="tertiary"
          style={{ marginRight: 10 }}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          disabled={loading}
          onClick={handleSubmit(handleFormSubmit)}
          size="md"
          themeType="accent"
        >
          Submit
        </Button>
      </div>
    </form>
  );

  return (
    <div className={styles.container}>
      <div className={styles.row_container}>
        <div className={styles.text}>Tracking Information</div>
        {shipmentType === "fcl_freight" ? (
          <Select
            size="sm"
            style={{ width: "200px" }}
            placeholder="Container no"
            value={containerNo}
            onChange={(e) => setContainerNo(e)}
            options={ContainerOptions || []}
          />
        ) : (
          <div className={cl`${styles.text} ${styles.airway_bill_no_head}`}>
            Airway Bill no:{" "}
            <div className={cl`${styles.text} ${styles.airway_bill_no}`}>
              {airwayBillNo || "NA"}
            </div>
          </div>
        )}
      </div>
      <Popover
        show={isOpen}
        theme="light-border"
        animation="shift-away"
        content={content}
        visible={isOpen}
        interactive
        placement="bottom"
      >
        <Button size="md" themeType="accent" onClick={() => setIsOpen(!isOpen)}>
          Raise a query?
        </Button>
      </Popover>

      <Modal show={showModal} size="sm" className={styles.modal_styles}>
        <Modal.Body>
          <RaiseQuery setShowModal={setShowModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Header;
