import { Avatar, Button } from "@cogoport/components";
import { startCase } from "@cogoport/utils";
import React from "react";

import styles from "./styles.module.css";

function Header({
  detail,
  setShowCtcBreakupModal,
  setCtcStructure = () => {},
  ctcStructure = {},
}) {
  const { name, employee_code, designation, passport_size_photo_url } =
    detail || {};

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <Avatar
          src={passport_size_photo_url}
          alt="img"
          disabled={false}
          size="160px"
          personName={name}
        />
        <div>
          <div className={styles.name}>{name}</div>
          <div className={styles.role}>{startCase(designation)}</div>
          <div className={styles.emp_code}>Employee Code: {employee_code}</div>
        </div>
      </div>

      <div className={styles.button_container}>
        <Button type="button" themeType="secondary">
          Action Button
        </Button>
        <Button
          onClick={() => setShowCtcBreakupModal(true)}
          type="button"
          themeType="secondary"
          style={{ marginLeft: 12 }}
        >
          Add CTC breakup
        </Button>
        <Button type="button" style={{ marginLeft: 12 }}>
          Reject Candidate
        </Button>
      </div>
    </div>
  );
}

export default Header;
