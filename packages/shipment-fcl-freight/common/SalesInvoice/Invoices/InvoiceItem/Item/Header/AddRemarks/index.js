import { Button, Textarea, Toast, Modal } from "@cogoport/components";
import { isEmpty } from "@cogoport/utils";
import React, { useState } from "react";
import useReviewInvoice from "../../../../../Hooks/useReviewInvoice";

function AddRemarks({
  showAddRemarks = false,
  setShowAddRemarks = () => {},
  invoice = {},
  refetch = () => {},
}) {
  const [remarkValue, setRemarkValue] = useState(invoice?.remarks || "");

  const onClose = () => {
    setRemarkValue(invoice?.remarks);
    setShowAddRemarks(false);
  };
  const payload = {
    id: invoice?.id,
    remarks: [remarkValue],
  };

  const refetchAfterCall = () => {
	onClose();
	refetch();
}
  const { onSubmitRemarks, loading } = useReviewInvoice({
    refetch: refetchAfterCall,
    payload,
  });

  const handleSubmit = () =>
    isEmpty(remarkValue)
      ? Toast.error("Please add remarks!")
      : onSubmitRemarks();

  return (
    <Modal onClose={onClose} show={showAddRemarks} width={600}>
      <Modal.Header title="Invoice Remarks" />

      <Modal.Body>
        <Textarea
          value={remarkValue}
          size="md"
          rows="6"
          onChange={(e) => setRemarkValue(e)}
          placeholder="Add remarks for your invoice..."
        />
      </Modal.Body>

      <Modal.Footer>
        <Button
          className="secondary md"
          onClick={onClose}
          style={{ marginRight: "20px" }}
        >
          Cancel
        </Button>

        <Button
          className="primary md"
          onClick={handleSubmit}
          disabled={loading}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddRemarks;
