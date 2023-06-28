import styles from "./styles.module.css";
import { format } from "@cogoport/utils";

function UpdatedOn({ data }) {
    return (
        <>
            <div className={styles.updated_on}>
                Updated On :{" "}
                {format(data?.[0]?.updated_at, "dd MMM yyyy", null, true)}{" "}
            </div>
        </>
    );
}

export default UpdatedOn;
