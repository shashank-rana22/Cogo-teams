import React, { useState } from 'react';

import useGetShipmentOperatingProcedure from '../../hooks/useGetShipmentOperatingProcedure';

import Body from './components/Body';
import Header from './components/Header';
import History from './components/History';

function SOP() {
	const [showHistory, setShowHistory] = useState(false);

	const { data, filters, loading, apiTrigger } = useGetShipmentOperatingProcedure({});

	return (
		<>
			<Header setShowHistory={setShowHistory} showHistory={showHistory} />
			{showHistory ? <History /> : <Body data={data} />}
		</>
	);
}

export default SOP;
