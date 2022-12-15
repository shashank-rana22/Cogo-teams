import React from 'react';
import {Table} from "@cogoport/components";
import styles from "./styles.module.css";
import {TableProps} from "../Interfaces/index"

const StyledTable = ({id, className, columns, data, ...rest}:TableProps) => {
return (
    <div className={styles.table}>
        <Table
		columns={columns}
		data={data}
        id={id}
        className={className}
        {...rest}
	/>
    </div>
)
}

export default StyledTable;