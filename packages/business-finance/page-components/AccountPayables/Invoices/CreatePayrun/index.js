import React, { useState, useRef } from 'react';

import usePostAddToSelected from '../hooks/usePostAddToSelected';

import Footer from './Footer';
import SelectInvoices from './SelectInvoices';
import ViewSelectedInvoices from './ViewSelectedInvoices';

function CreatePayrun() {
	const [viewSelectedInvoices, setViewSelectedInvoices] = useState(false);
	const [apiData, setApiData] = useState({});
	const ref = useRef({});

	const handleRefetch = () => {
		const refetch = ref.current.getPayrunInvoices;
		refetch();
	};

	const { submitSelectedInvoices, loading } = usePostAddToSelected({
		getPayrunInvoices: handleRefetch,
		apiData,
	});

	return (
		<div>
			{viewSelectedInvoices ? (
				<ViewSelectedInvoices
					apiData={apiData}
					setApiData={setApiData}
					setViewSelectedInvoices={setViewSelectedInvoices}
				/>
			)
				: (
					<SelectInvoices
						setApiData={setApiData}
						apiData={apiData}
						ref={ref}
					/>
				)}
			<Footer
				viewSelectedInvoices={viewSelectedInvoices}
				setViewSelectedInvoices={setViewSelectedInvoices}
				apiData={apiData}
				loading={loading}
				submitSelectedInvoices={submitSelectedInvoices}
			/>
		</div>
	);
}

export default CreatePayrun;
