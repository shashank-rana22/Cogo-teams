import useListShipments from "./hooks/useListShipments";
import List from "./components/List";
import TabsAndFilters from './components/TabsAndFilters';

export default function FCLDesk({ stateProps }){
    const { data, loading } = useListShipments({ stateProps });

    return <div>
        <div style={{display: 'flex', justifyContent: 'space-between'}} >
            <h1>Booking Desk</h1>
        </div>

        <TabsAndFilters stateProps={stateProps} />

        <List data={data} loading={loading} stateProps={stateProps} />
    </div>
}