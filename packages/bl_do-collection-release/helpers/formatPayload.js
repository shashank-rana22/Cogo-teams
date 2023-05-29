import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

const evaluateDate = (val) => {
	if (val === 'now') {
		return new Date();
	}
	return null;
};

const formatForBLIds = (item, customVal) => {
	const bl_ids = item?.bl_ids;
	const returnBLIdKeys = [];

	(Object.keys(bl_ids) || []).forEach((id_key) => {
		if (bl_ids[id_key] === customVal) {
			returnBLIdKeys.push(id_key);
		}
	});
	return returnBLIdKeys;
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
			const [customKey, customVal] = (valKey || '').split(':');
			if (customKey === 'bl_ids') {
				newValue = formatForBLIds(item, customVal);
			} else {
				newValue = item?.[valKey];
			}
		}
	}
	return newValue;
};

const getCurrentReleaseStatus = (item, inner_tab, formValues) => {
	const docs = item?.trade_type === 'export'
		? item?.export_bl_details
		: item?.import_bl_details;
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
	inner_tab = '',
	item = {},
	formValues = {},
	taskConfig = {},
	pendingTasks = [],
}) {
	let finalPayload = {};

	if (inner_tab === 'knockoff_pending') {
		const knockoffTask = (pendingTasks || []).filter(
			(task) => task.task === 'knockoff_invoices',
		);
		if (knockoffTask.length === 0) {
			Toast.error('Task not found');
			return false;
		}
		finalPayload = {
			id   : knockoffTask?.[0]?.id,
			data : {
				collection_party: {
					is_knocked_off : true,
					id             : (item?.invoice_data || []).map((invoice) => invoice?.id),
				},
			},
		};
		return finalPayload;
	}

	if (inner_tab === 'collected' && item?.trade_type === 'import') {
		const doTask = (pendingTasks || []).filter(
			(task) => task.task === 'mark_do_released',
		);
		if (doTask.length === 0) {
			Toast.error('Task not found');
			return false;
		}
		finalPayload = {
			id   : doTask?.[0]?.id,
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
			finalPayload[data.key] = pendingTasks?.[0]?.id;
			if (finalPayload[data.key] === undefined) {
				Toast.error('Task not found');
				finalPayload = false;
			}
		} else if (finalPayload && data?.key === 'data') {
			finalPayload.data = fillData(data?.value, item, formValues);
			if (finalPayload.data?.bl_detail?.id?.length === 0) {
				Toast.error('BL ID not found');
				finalPayload = false;
			}
			if (
				['collection_pending', 'collected', 'released', 'surrendered'].includes(
					inner_tab,
				)
			) {
				const res = getCurrentReleaseStatus(item, inner_tab, formValues);
				finalPayload.status = res ? 'completed' : 'pending';
			}
		}
	});

	return finalPayload;
}
