function documentTypeMapping(type) {
	switch (type) {
		case 'gst':
		case 'pan':
			return 'KYC Document';
		case 'undefined':
			return 'Wrong Document';
		default:
			return 'Shipment';
	}
}
export default documentTypeMapping;
