import { useState } from "react";
import {
  cl,
  Popover,
  Button,
  Select,
  Modal,
  Textarea,
} from "@cogoport/components";
import RaiseQuery from "./RaiseQuery";
import useCreateRaiseQuery from "../hooks/useCreateRaiseQuery";
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
  const [queryType, setQueryType] = useState("");
  const [remarks, setRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { loading, handleFormSubmit,  } =
		useCreateRaiseQuery({
			setShowModal,
			setIsOpen,
			shipmentId,
      queryType,
      remarks,
		});

  const content = (
    <div className={styles.content}>
      <Select
        size="sm"
        style={{ width: "250px", paddingBottom: "20px" }}
        label="Issue Related to"
        placeholder="Select"
        value={queryType}
        onChange={(e) => setQueryType(e)}
        options={[
          {
            label: "Inaccurate data",
            value: "inaccurate_data",
          },
          {
            label: "Shipment Rollover",
            value: "shipment_rollover",
          },
          {
            label: "Map View is not available",
            value: "map_view_not_available",
          },
          {
            label: "Other",
            value: "other",
          },
        ]}
      />

      <Textarea size="lg" placeholder="Please type here" onChange={(e) => setRemarks(e)} value={remarks}/>
      <div className={styles.button_div}>
        <Button
          onClick={() => {
            setIsOpen(false);
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
          onClick={handleFormSubmit}
          size="md"
          themeType="accent"
        >
          Submit
        </Button>
        hii
      </div>
    </div>
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
