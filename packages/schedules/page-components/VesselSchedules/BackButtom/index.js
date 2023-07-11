import { useRouter } from "@cogoport/next";
import styles from "./styles.module.css";
import { IcMArrowBack } from "@cogoport/icons-react";

function BackButton() {
    const { push } = useRouter();
    const onClickHandle = () => {
        push("/schedules/vessel-schedules/", `/schedules/vessel-schedules`);
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
            Back To Vessel Scheduele
        </div>
    );
}

export default BackButton;
