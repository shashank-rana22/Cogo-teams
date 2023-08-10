import { isEmpty } from '@cogoport/utils';

const getShowElements = (
	controls = [],
	formValues = {},
	profile = '',
	supplyAgent = {},
) => {
	const FINAL_SHOW_ELEMENTS = {};

	const isSupplyAgentPresent = isEmpty(supplyAgent);

	controls.forEach((item) => {
		FINAL_SHOW_ELEMENTS[item.name] = true;

		if (profile === 'okam') {
			FINAL_SHOW_ELEMENTS.source = formValues?.fraud_reason === 'black_listed_customer-5';

			FINAL_SHOW_ELEMENTS.proof_url = formValues?.fraud_reason === 'black_listed_customer-5';

			FINAL_SHOW_ELEMENTS.escalated_to_sales = formValues?.fraud_reason === 'collection_issue-3';

			FINAL_SHOW_ELEMENTS.escalated_to_sales_at = formValues?.fraud_reason === 'collection_issue-3'
				&& formValues?.escalated_to_sales === 'yes';

			FINAL_SHOW_ELEMENTS.value_of_cargo = formValues?.fraud_reason === 'low_cargo_value-1';
		}

		if (profile === 'sop2') {
			FINAL_SHOW_ELEMENTS.source = [
				'black_listed_customer-5',
				'multiple_freight_forwarders-4',
			].includes(formValues?.fraud_reason);

			FINAL_SHOW_ELEMENTS.proof_url = [
				'black_listed_customer-5',
				'multiple_freight_forwarders-4',
			].includes(formValues?.fraud_reason);

			FINAL_SHOW_ELEMENTS.is_yard_same = formValues?.fraud_reason === 'containers_not_available-1';

			FINAL_SHOW_ELEMENTS.name_of_yard = FINAL_SHOW_ELEMENTS.is_yard_same === true
				&& formValues?.is_yard_same === 'no';
			FINAL_SHOW_ELEMENTS.poc_name = FINAL_SHOW_ELEMENTS.is_yard_same === true
				&& formValues?.is_yard_same === 'no';
			FINAL_SHOW_ELEMENTS.poc_mobile = FINAL_SHOW_ELEMENTS.is_yard_same === true
				&& formValues?.is_yard_same === 'no';

			FINAL_SHOW_ELEMENTS.select_document = formValues?.fraud_reason === 'key_documents_delayed-2';

			FINAL_SHOW_ELEMENTS.air_export = FINAL_SHOW_ELEMENTS.select_document === true
				&& formValues?.select_document === 'air_export';
			FINAL_SHOW_ELEMENTS.air_import = FINAL_SHOW_ELEMENTS.select_document === true
				&& formValues?.select_document === 'air_import';
			FINAL_SHOW_ELEMENTS.customs = FINAL_SHOW_ELEMENTS.select_document === true
				&& formValues?.select_document === 'customs';

			FINAL_SHOW_ELEMENTS.escalated_to_sales = [
				'containers_not_available-1',
				'key_documents_delayed-2',
				'document_on_hold-4',
				'supplier_not_responsive-2',
				'delay_in_invoice-3',
			].includes(formValues?.fraud_reason);

			FINAL_SHOW_ELEMENTS.who_escalate = isSupplyAgentPresent
				? FINAL_SHOW_ELEMENTS.escalated_to_sales === true
				&& formValues?.escalated_to_sales === 'yes'
				: false;
			FINAL_SHOW_ELEMENTS.escalated_at = FINAL_SHOW_ELEMENTS.escalated_to_sales === true
				&& formValues?.escalated_to_sales === 'yes';

			FINAL_SHOW_ELEMENTS.screenshot = formValues?.fraud_reason === 'tech_error-1';
		}
	});

	return FINAL_SHOW_ELEMENTS;
};

export default getShowElements;
