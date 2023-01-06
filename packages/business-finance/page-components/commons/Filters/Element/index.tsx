import {
    Input,
    Modal,
    Pill,
    Select,
    Tags,
    Tooltip,
    Datepicker,
} from "@cogoport/components";
import React, { CSSProperties, useState } from "react";
import freightMapping from "../../Constants/freight-mappings";
import CostView from "../../costView/index";
import styles from "./styles.module.css";
import { Options } from "../../Interfaces";
import SegmentedControl from "../../SegmentedControl";
import { IcMSearchlight } from "@cogoport/icons-react";

interface ElementProps {
    type?: string;
    value?: string | Date;
    className?: string;
    url?: string;
    href?: string;
    key?: string;
    name: string;
    onChange?: (val: any) => void;
    options?: Options[];
    setFilters: (p: object) => void;
    filters: object;
    [key: string]:
        | string
        | undefined
        | ((val: any) => void)
        | Options[]
        | object
        | CSSProperties;
}

const Element = ({
    type,
    value,
    className,
    url,
    href = "#",
    name,
    filters,
    ...rest
}: ElementProps) => {
    const [show, setShow] = useState(false);
    const { style, selectWidth, options } = rest || {};
    const { setFilters } = rest;
    const tagClick = (val: Options) => {
        setFilters((prev: object) => ({
            ...prev,
            [name]: val.value,
            pageIndex: 1,
        }));
    };

    const getElement = () => {
        switch (type) {
            case "tags":
                return (
                    <div className={styles.flex} style={style as CSSProperties}>
                        {rest?.options?.map((val) => (
                            <div
                                style={{ margin: "5px" }}
                                onClick={() => tagClick(val)}
                            >
                                <div
                                    className={
                                        val.value ===
                                        filters[name as keyof typeof filters]
                                            ? styles.active
                                            : styles.normal
                                    }
                                >
                                    {val.label}
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case "href":
                return (
                    <div style={style as CSSProperties}>
                        <div
                            className={styles.urlContainer}
                            onClick={() => setShow(true)}
                        >
                            {value as string}
                        </div>
                        {show && href && (
                            <Modal
                                className="primary lg"
                                show={show}
                                onClose={() => setShow(false)}
                            >
                                <CostView
                                    onClose={() => setShow(false)}
                                    shipment_id={href}
                                />
                            </Modal>
                        )}
                    </div>
                );

            case "pdfView":
                return (
                    <div>
                        <div
                            className={styles.urlContainer}
                            style={style as CSSProperties}
                            onClick={() => window.open(url, "_blank")}
                        >
                            {(value as string)!.length > 15 ? (
                                <Tooltip
                                    interactive
                                    placement="top"
                                    content={value as string}
                                >
                                    <div
                                        className={styles.textDiv}
                                    >{`${(value as string)!.substring(
                                        0,
                                        15
                                    )}...`}</div>
                                </Tooltip>
                            ) : (
                                <div className={styles.textDiv}>
                                    {value as string}
                                </div>
                            )}
                        </div>
                    </div>
                );
            case "pills":
                return (
                    <>
                        {rest?.options?.map((val) => (
                            <Pill
                                size="sm"
                                color="yellow"
                                className={className}
                                style={style as CSSProperties}
                            >
                                {val.label}
                            </Pill>
                        ))}
                        ;
                    </>
                );
            case "select":
                return (
                    <div
                        className={styles.select_container}
                        style={
                            {
                                "--width": selectWidth || "200px",
                            } as CSSProperties
                        }
                    >
                        <Select
                            value={value as string}
                            className={className}
                            options={options || []}
                            style={style as CSSProperties}
                            {...rest}
                        />
                    </div>
                );
            case "input":
                return (
                    <Input
                        value={value as string}
                        style={style as CSSProperties}
                        className={className}
                        prefix={<IcMSearchlight height={15} width={15} />}
                        {...rest}
                    />
                );
            case "datepicker":
                return (
                    <Datepicker
                        name="date"
                        value={value as Date}
                        style={style as CSSProperties}
                        {...rest}
                    />
                );
            case "serviceType":
                return (
                    <div className={className} {...rest}>
                        {freightMapping[
                            value as keyof typeof freightMapping
                        ]?.name.replace("_", "") || "-"}
                    </div>
                );
            case "segmented":
                return (
                    <SegmentedControl
                        options={
                            rest?.options as {
                                label: string;
                                value: string;
                                icon?: JSX.Element;
                                badge?: number;
                            }[]
                        }
                        activeTab={(value as string) || ""}
                        setActiveTab={(val: string) => {
                            setFilters((p: object) => ({ ...p, [name]: val }));
                        }}
                        style={style as CSSProperties}
                        {...rest}
                    />
                );

            default:
                return (
                    <div className={className} {...rest}>
                        {value as string}
                    </div>
                );
        }
    };
    return <div>{getElement()}</div>;
};

export default Element;
