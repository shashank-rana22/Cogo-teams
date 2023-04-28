import mapKeyValues from './generic-formatted';

const defaultKeyMappings = {
	yard_details     : 'empty_container-depot_cogo_id',
	movement_details : {
		from_port_id       : 'from_cogo_id',
		to_port_id         : 'to_cogo_id',
		schedule_departure : 'ETD',
		schedule_arrival   : 'ETA',
		vessel             : 'Vessel',
		voyage             : 'Voy No',
	},
	vgm_cutoff                      : 'vgm_cutoff',
	si_cutoff                       : 'si_cutoff',
	document_cutoff                 : 'doc_cutoff',
	gate_in_cutoff                  : 'gate_cutoff',
	bn_expiry                       : 'bn_expiry',
	tr_cutoff                       : 'tr_cutoff',
	free_days_detention_origin      : 'free_days_detention_origin',
	free_days_detention_destination : 'free_days_detention_destination',
	free_days_demurrage_destination : 'free_days_demurrage_destination',
	document_number                 : 'document_number',
};
const formatBookingNote = ({ mailData }) => {
	const formattedData = [];
	const fileUrls = [];
	mailData.forEach((booking_note) => {
		const rpaData = booking_note.ocr_data || {};
		const formatted_bn = mapKeyValues({
			keyMappings: defaultKeyMappings,
			rpaData,
		});
		formattedData.push(formatted_bn);

		const file_url_ar = booking_note?.file_url?.split('/');
		fileUrls.push({
			name    : file_url_ar[file_url_ar.length - 1],
			url     : booking_note.file_url,
			success : true,
		});
	});
	return { formattedData, fileUrls };
};

export default formatBookingNote;
