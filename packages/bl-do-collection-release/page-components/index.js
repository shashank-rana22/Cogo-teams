import useListBLShipments from "../hooks/useListBLShipment";
import useListDOShipments from "../hooks/useListDOShipments";
import useListTasks from '../hooks/useListTasks';
export default function BLDoCollectionDesk(){

  const fcl_bl_data = useListBLShipments({prefix: 'fcl_freight'});
  const lcl_bl_data = useListBLShipments({prefix: 'lcl_freight'});
  const fcl_local_bl_data = useListBLShipments({prefix: 'fcl_freight_local'});

  console.log('fcl_bl_data', fcl_bl_data);
  console.log('fcl_local_bl_data', fcl_local_bl_data);
  console.log('lcl_bl_data', lcl_bl_data);


  const fcl_do_data = useListDOShipments({prefix: 'fcl_freight'});
  const lcl_do_data = useListDOShipments({prefix: 'lcl_freight'});
  const fcl_local_do_data = useListDOShipments({prefix: 'fcl_freight_local'});

  console.log('fcl_do_data', fcl_do_data);
  console.log('lcl_do_data', lcl_do_data);
  console.log('fcl_local_do_data', fcl_local_do_data);

  // const fcl_do_data = useListTasks({prefix: 'fcl_freight'});
  // const lcl_do_data = useListTasks({prefix: 'lcl_freight'});
  // const fcl_local_do_data = useListTasks({prefix: 'fcl_local_freight'});

  // console.log('fcl_do_data', fcl_do_data);
  // console.log('lcl_do_data', lcl_do_data);
  // console.log('fcl_local_do_data', fcl_local_do_data);

  


  return(
    <div>This is bl do collection desk</div>
  )
}