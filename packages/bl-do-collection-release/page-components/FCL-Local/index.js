import useListBLShipments from '../../hooks/useListBLShipment';
import useListDOShipments from '../../hooks/useListDOShipments';

function FCLLocal({ stateProps={} }){
  let data = {};
  if(stateProps.activeTab === 'bl_collection'){
    data = useListBLShipments({prefix: 'fcl_local'});
  }else{
    data = useListDOShipments({ prefix: 'fcl_local'});
  }
    return(
      <div>Fcl Locals</div>
    )
}
export default FCLLocal;