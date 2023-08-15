import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

const evaluateDate = (val) => {
	if (val === 'now') {
		return new Date();
	}
	return null;
};

const evaluateTernary = (val, item, formValues) => {
	const [source, expression] = (val || '').split('::');
	const [conditionKey, compareValue, trueVal, falseVal] = (
		expression || ''
	).split(':');

	let returnVal = '';
	if (source === 'item') {
		returnVal = item[conditionKey] === compareValue ? trueVal : falseVal;
	}
	if (source === 'formValue') {
		returnVal = formValues[conditionKey] === compareValue ? trueVal : falseVal;
	}

	return returnVal;
};

const fillData = (value, item, formValues) => {
	let newValue = JSON.parse(JSON.stringify(value));

	if (typeof value === 'object') {
		Object.keys(value).forEach((objKey) => {
			newValue[objKey] = fillData(value[objKey], item, formValues);

			if (isEmpty(newValue[objKey])) {
				delete newValue[objKey];
			}
		});
	} else {
		const [source, valKey] = (value || '').split(',');

		if (source === 'static') {
			newValue = valKey;
		} else if (source === 'date') {
			newValue = evaluateDate(valKey);
		} else if (source === 'ternary') {
			newValue = evaluateTernary(valKey, item, formValues);
		} else if (source === 'formValue') {
			newValue = formValues?.[valKey] ?? null;
		} else if (source === 'item') {
			newValue = item?.[valKey];
		}
	}
	return newValue;
};

const getCurrentReleaseStatus = (item, inner_tab, formValues, activeTab) => {
	const docs = activeTab === 'bl'
		? item?.bill_of_ladings
		: item?.delivery_orders;

	const selectedDocsLength = formValues?.ids?.length;

	if (inner_tab === 'collection_pending') {
		const collectedDocs = (docs || []).filter(
			(i) => i?.collection_mode === null,
		);
		const collectedDocsLength = collectedDocs?.length;

		const canCompleteTask = collectedDocsLength === selectedDocsLength;
		return canCompleteTask;
	}

	if (inner_tab === 'collected') {
		const releasePendingDocs = (docs || []).filter(
			(i) => i?.status === 'release_pending',
		);
		const releasePendingDocsLength = releasePendingDocs?.length;

		const canCompleteTask = releasePendingDocsLength === selectedDocsLength;

		return canCompleteTask;
	}
	if (inner_tab === 'released') {
		const deliveryPendingDocs = (docs || []).filter(
			(i) => i?.status === 'released',
		);
		const deliveryPendingDocsLength = deliveryPendingDocs?.length;

		const canCompleteTask = deliveryPendingDocsLength === selectedDocsLength;
		return canCompleteTask;
	}

	if (inner_tab === 'surrendered') {
		const surrenderPendingDocs = (docs || []).filter(
			(i) => i?.status === 'surrender_pending',
		);
		const surrenderPendingDocsLength = surrenderPendingDocs?.length;

		const canCompleteTask = surrenderPendingDocsLength === selectedDocsLength;

		return canCompleteTask;
	}
	return null;
};

export default function getFormattedPayload({
	stateProps = {},
	item = {},
	formValues = {},
	taskConfig = {},
	pendingTasks = [],
}) {
	const { activeTab, inner_tab, trade_type } = stateProps;

	let finalPayload = {};

	const { invoice_data = [] } = item;

	const invoicesToBeKnockedOffInBL = Array.from(
		new Set(
			(invoice_data || [])
				.filter((invoice) => (invoice?.services || []).some((service) => (
					(service?.service_type === 'fcl_freight_service' && activeTab === 'bl')
		|| service?.trade_type === 'export'
				)))
				.map((invoice) => invoice.id),
		),
	);

	const invoicesToBeKnockedOffInDO = Array.from(
		new Set(
			(invoice_data || [])
				.filter((invoice) => (invoice?.services || []).some((service) => (
					(service?.service_type === 'fcl_freight_service' && activeTab === 'do')
				|| service?.trade_type === 'import'
				)))
				.map((invoice) => invoice.id),
		),
	);

	if (inner_tab === 'knockoff_pending') {
		let knockoffTask = (pendingTasks || []).filter(
			(task) => task.task === 'knockoff_invoices',
		);

		if (activeTab === 'bl' && trade_type === 'import') {
			knockoffTask = (pendingTasks || []).filter(
				(task) => task.task === 'knockoff_bl_invoices',
			);
		}

		if (activeTab === 'do' && trade_type === 'export') {
			knockoffTask = (pendingTasks || []).filter(
				(task) => task.task === 'knockoff_do_invoices',
			);
		}

		if (isEmpty(knockoffTask)) {
			Toast.error('Task not found');
			return {};
		}
		finalPayload = {
			id   : knockoffTask?.[GLOBAL_CONSTANTS.zeroth_index]?.id,
			data : {
				collection_party: {
					is_knocked_off : true,
					id             : activeTab === 'bl' ? invoicesToBeKnockedOffInBL : invoicesToBeKnockedOffInDO,
				},
			},
		};
		return finalPayload;
	}

	if (inner_tab === 'collected' && activeTab === 'do') {
		const doTask = (pendingTasks || []).filter(
			(task) => task.task === 'mark_do_released',
		);
		if (isEmpty(doTask)) {
			Toast.error('Task not found');
			return {};
		}
		finalPayload = {
			id   : doTask?.[GLOBAL_CONSTANTS.zeroth_index]?.id,
			data : {
				do_detail: {
					status      : 'released',
					shipment_id : item?.id,
				},
			},
		};
		return finalPayload;
	}

	(taskConfig?.static_data_to_send || []).forEach((data) => {
		if (data?.key === 'id') {
			finalPayload[data.key] = pendingTasks?.[GLOBAL_CONSTANTS.zeroth_index]?.id;
			if (finalPayload[data.key] === undefined) {
				Toast.error('Task not found');
				finalPayload = {};
			}
		} else if (finalPayload && data?.key === 'data') {
			finalPayload.data = fillData(data?.value, item, formValues);

			if ((activeTab === 'bl'
				? isEmpty(finalPayload.data?.bl_detail?.id)
				: isEmpty(finalPayload.data?.do_detail?.id)) && finalPayload?.data !== null
			) {
				Toast.error(`${activeTab === 'bl' ? 'BL' : 'DO'} ID not found`);
				delete finalPayload?.data;
			}

			if (
				['collection_pending', 'collected', 'released', 'surrendered'].includes(
					inner_tab,
				)
			) {
				const res = getCurrentReleaseStatus(item, inner_tab, formValues);

				if (res) { finalPayload.status = 'completed'; } else finalPayload.status = 'pending';
			}
		}
	});

	return finalPayload;
}
