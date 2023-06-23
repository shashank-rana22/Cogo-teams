import styles from "./styles.module.css";
import { IcMArrowBack } from "@cogoport/icons-react";

function BackButton({ mapTab, setMapTab }) {
    const onClickHandle = () => {
        setMapTab(null);
    };
    return (
        <div
            className={styles.container}
            onClick={() => {
                onClickHandle();
            }}
        >
            <div className={styles.arrow}>
                <IcMArrowBack
                    fill="#221f20"
                    style={{ width: "1.3em", height: "1.3em" }}
                />
            </div>
            Back To Service Lane
        </div>
    );
}

export default BackButton;
