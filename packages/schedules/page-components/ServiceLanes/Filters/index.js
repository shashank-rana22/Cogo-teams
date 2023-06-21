import { Input, Button } from "@cogoport/components";
import { IcMSearchlight, IcMFilter } from "@cogoport/icons-react";
import styles from "./styles.module.css";
import SortBy from "./utils";
import { useState } from "react";

function Filters() {
    const [sortBy, setSortBy] = useState(null);

    return (
        <div className={styles.outer_box}>
            <div className={styles.filter_search}>
                <Button
                    size="xl"
                    themeType="secondary"
                    styles={{ height: "40px" }}
                >
                    <IcMFilter />
                    Filters
                </Button>

                <div className={styles.search}>
                    <Input
                        size="md"
                        prefix={<IcMSearchlight />}
                        placeholder="Search"
                    />
                </div>
            </div>
            <div>
                <SortBy sortBy={sortBy} setSortBy={setSortBy} />
            </div>
        </div>
    );
}

export default Filters;
