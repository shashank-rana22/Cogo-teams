import React, { useState } from "react";
import useShipmentIdView from "../../hook/useShipmentIdView";
import AccordianCards from "./AccordianCards/index";
import LoadingState from "./LoadingState/index";

const ShipmentIdView = () => {
    // const { data } = useShipmentIdView();
    const [currentOpenSID, setCurrentOpenSID] = useState("");

    const {
        hookSetters,
        page,
        filters,
        loading,
        list: { total, data },
        refetch,
        statsData,
        statsLoading,
    } = useShipmentIdView();

    return (
        <div>
            <div>
                {/* {data?.map((item: any) => {
                    return (
                        <AccordianCards
                            itemData={item}
                            currentOpenSID={currentOpenSID}
                            setCurrentOpenSID={setCurrentOpenSID}
                            key={item?.id}
                            refetch={refetch}
                        />
                    );
                })} */}

                {data?.map((item: any) => (
                    <>
                        {loading ? (
                            <LoadingState />
                        ) : (
                            <AccordianCards
                                itemData={item}
                                currentOpenSID={currentOpenSID}
                                setCurrentOpenSID={setCurrentOpenSID}
                                key={item?.id}
                                refetch={refetch}
                            />
                        )}
                    </>
                ))}
            </div>
        </div>
    );
};

export default ShipmentIdView;
