import React from "react";
import styles from "./styles.module.css";

interface itemTypes {
    remarks?: string;
}

interface propsType {
    item: itemTypes;
}
const RemarksContent = ({ item }: propsType) => {
    return (
        <div className={styles.conatiner}>
            <li className={styles.listStyle}>
                {item.remarks}
                Remarks goes here
                <div>Updated by jaipraksh - 14:15 PM on 28/05/2022</div>
            </li>
        </div>
    );
};

export default RemarksContent;
