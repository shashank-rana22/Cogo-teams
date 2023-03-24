import { useState } from 'react';
import useListShipments from "./hooks/useListShipments";
import List from "./List";
import TabsAndFilters from './TabsAndFilters';

export default function BookingDesk(){
    const [filters, setFilters] = useState({ page: 1 });
    const [activeTab, setActiveTab] = useState('place_booking');
    const { data, loading } = useListShipments({ filters, activeTab });

    return <div>
        <div style={{display: 'flex', justifyContent: 'space-between'}} >
            <h1>Booking Desk</h1>
        </div>

        <TabsAndFilters activeTab={activeTab} setActiveTab={setActiveTab} filters={filters} setFilters={setFilters} />

        <List data={data} loading={loading} setFilters={setFilters} filters={filters} />
    </div>
}