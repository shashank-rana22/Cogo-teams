const getContentMapping = ({ t = () => {} }) => ({
	submit_lms_data : t('amsSubmission:modal_content_submit_lms_data'),
	amend           : t('amsSubmission:modal_content_amend'),
	send_email      : t('amsSubmission:modal_content_send_email'),
});

export default getContentMapping;
