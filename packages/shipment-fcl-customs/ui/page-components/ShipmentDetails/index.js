import React from "react";

import {useRouter} from "next/router"

const ShipmentDetails=()=>{

    const {id}=useRouter()

    return <div>Shipment Detail id = {id} </div>
}

export default ShipmentDetails