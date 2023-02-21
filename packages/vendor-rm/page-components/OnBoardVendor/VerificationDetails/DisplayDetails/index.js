import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from './EmptyState';
import LoadingState from './LoadingState';
import PaymentDetails from './PaymentDetails';
import styles from './styles.module.css';
import VendorContact from './VendorContact';
import VendorDetails from './VendorDetails';
import VendorServices from './VendorServices';

const component_mapping = {
	vendor_details : VendorDetails,
	pocs           : VendorContact,
	services       : VendorServices,
	bank_details   : PaymentDetails,
};

function DisplayDetails({
	vendorInformation,
	loading,
}) {
	const display = ({ title, body }) => {
		const Component = component_mapping[title];

		if (!Component) {
			return null;
		}

		return <Component detail={body} />;
	};

	if (loading) {
		return (
			<LoadingState />
		);
	}

	if (isEmpty(vendorInformation)) {
		return (
			<EmptyState />
		);
	}

	return (
		<div className={styles.container}>
			{/* {
                Object.keys(vendorInformation).map((title) => display({ title, body: vendorInformation[title] }))
            } */}
			{
				Object.keys(component_mapping).map((title) => display({ title, body: vendorInformation[title] }))
			}
		</div>
	);
}

export default DisplayDetails;
