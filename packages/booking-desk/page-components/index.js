import { useState } from 'react';
import { dynamic } from '@cogoport/next'

const FCLDesk = dynamic(() => import('./FCL'), {ssr: false});

export default function BookingDesk(){
    const [filters, setFilters] = useState({ page: 1 });
    const [activeTab, setActiveTab] = useState('place_booking');

    const stateProps={ activeTab, setActiveTab, filters, setFilters };

    return <FCLDesk stateProps={stateProps} />
}