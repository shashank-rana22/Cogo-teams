import { useState } from "react";
import { cl, Popover, Button, Select, Modal } from "@cogoport/components";
import RaiseQuery from "./RaiseQuery";
import styles from "./styles.module.css";

function Header({
  ContainerOptions = [],
  setContainerNo = () => {},
  containerNo = "",
  shipmentId = "",
  airwayBillNo = "",
  shipmentType = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const content = (
    <div className={styles.content}>
      {/* <Layout
				controls={controls}
				fields={fields}
				errors={errors}
				themeType="admin"
			/> */}
      <div className={styles.button_div}>
        <Button
          onClick={() => {
            setIsOpen(false);
            // reset();
          }}
          size="md"
          themeType="tertiary"
          style={{ marginRight: 10 }}
          // disabled={loading}
        >
          Cancel
        </Button>
        <Button
          // disabled={loading}
          // onClick={handleSubmit(handleFormSubmit)}
		  onClick={() => {
			setShowModal(true);
			setIsOpen(false);
		  }}
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
            className="primary md custom"
            theme="admin"
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
