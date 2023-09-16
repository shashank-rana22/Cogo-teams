import getFormattedValues from '../../helpers/getFormattedValues';
import toastApiError from '../../utils/toastApiError';

const ZERO = 0;
const getHandleFormSubmit = ({
	activeKey = '', setActiveKey = () => {},
	formValues = {}, item = {}, setIdValues = () => {}, type = '', agent_id = '',
	router = {}, updateForm = () => {}, submitForm = () => {},
}) => {
	const handleFormSubmit = async (value) => {
		const MV = [];
		const { margin_slabs:MS, ...rest } = value;
		const ms = MS.map((it) => {
			const { lower_limit, upper_limit, limit_currency, margin_values } = it;
			const new_margin_values = margin_values.map((val) => {
				const { code, currency, min_value, max_value } = val;
				return { code, type: val.type, value: val.value, currency, min_value, max_value };
			});
			MV.push(new_margin_values);
			return { lower_limit, upper_limit, limit_currency };
		});
		const values = { margin_slabs: ms, ...rest, margin_values: MV };
		const [slabs_currency] = values.margin_slabs || [];
		const { limit_currency } = slabs_currency || {};

		const editValues = {
			...values,
			trade_type:
                values?.trade_type
                || formValues?.trade_type
                || item?.filters?.trade_type,
		};
		if (activeKey === 'customize') {
			setActiveKey('add');
			setIdValues(values);
		} else if (activeKey === 'add') {
			try {
				const formattedValues = getFormattedValues(
					{ values: editValues },
				);
				const rawPayload = {
					...formattedValues,
					status   : type === 'update' ? item?.status : undefined,
					agent_id : ['demand', 'supply'].includes(formattedValues?.margin_type)
						? agent_id
						: undefined,
					margin_slabs_currency: limit_currency,
				};
				const PAYLOAD = {};
				Object.keys(rawPayload || {}).forEach((key) => {
					if (rawPayload[key] || rawPayload[key] === ZERO) {
						PAYLOAD[key] = rawPayload[key];
					}
				});

				const editPayload = {
					margin_slabs_currency : limit_currency,
					margin_slabs          : formattedValues?.margin_slabs,
					id                    : item?.id,
				};
				const actualPayload = type === 'edit' ? editPayload : PAYLOAD;
				if (type === 'edit') {
					await updateForm({ data: actualPayload });
				} else {
					await submitForm({ data: actualPayload });
				}
				router.push('/margins');
			} catch (err) {
				toastApiError(err);
			}
		}
	};
	return handleFormSubmit;
};

export default getHandleFormSubmit;
