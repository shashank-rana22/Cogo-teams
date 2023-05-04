import useListBLShipments from '../../hooks/useListBLShipment';
import useListDOShipments from '../../hooks/useListDOShipments';

function LCL({ stateProps = {} }){
  let data = {};
  if(stateProps.activeTab === 'bl_collection'){
    data = useListBLShipments({prefix: 'lcl_freight'});
  }else{
    data = useListDOShipments({ prefix: 'lcl_freight'});
  }
  console.log(data,'data');
  return(
    <div>
      Lcl
    </div>
  )
}
export default LCL;