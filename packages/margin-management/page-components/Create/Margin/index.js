import { Pill } from '@cogoport/components';
import { startCase, isEmpty } from '@cogoport/utils';

import NestedLayout from '../../../common/NestedLayout';

import styles from './styles.module.css';

function Margin({
	watch = () => {},
	idValues = {},
	type = '',
	data = {},
	service = '',
	marginControls = [],
	control = {},
	errors = {},
	customFieldArrayControls = {},
}) {
	const formValues = watch();
	const marginType = (margin_type) => {
		if (margin_type === 'demand') {
			return 'sales';
		}
		return margin_type;
	};

	const origin = () => {
		if (type === 'edit') {
			if (
				!isEmpty(data?.filters?.location)
                || !isEmpty(idValues?.location_id?.name)
			) {
				return idValues?.location_id?.name || data?.filters?.location?.name;
			}
			if (
				!isEmpty(data?.filters?.origin_location)
                || !isEmpty(idValues?.origin_location_id?.name)
			) {
				return (
					idValues?.origin_location_id?.name
                    || data?.filters?.origin_location?.name
				);
			}
		}
		if (type === 'create') {
			return idValues?.location_id?.name || idValues?.origin_location_id?.name;
		}
		return null;
	};

	const destination = type === 'edit'
		? idValues?.organization_id?.business_name
        || data?.organization?.business_name
		: idValues?.organization_id?.business_name;

	const organization = type === 'edit'
		? idValues?.organization_id?.business_name
        || data?.organization?.business_name
		: idValues?.organization_id?.business_name;

	const shipping_line = type === 'edit'
		? idValues?.shipping_line?.business_name
        || data?.filters?.shipping_line?.business_name
		: idValues?.shipping_line?.business_name;

	const airline = type === 'edit'
		? idValues?.airline?.business_name
        || data?.filters?.airline?.business_name
		: idValues?.airline?.business_name;

	return (
		<div>
			<div className={styles.details_panel}>
				<div className={styles.flex}>
					<div>
						<div className={styles.flex_column}>
							<Pill color="green">
								{marginType(formValues?.margin_type || data?.margin_type)}
							</Pill>
							<Pill color="yellow">{startCase(service)}</Pill>
							{origin() && <Pill>{origin() }</Pill>}
							{destination && <Pill>{ destination}</Pill>}
						</div>

						{organization ? (
							<Pill>{organization}</Pill>
						) : null}

						{shipping_line ? (
							<Pill>{shipping_line}</Pill>
						) : null}

						{airline ? (
							<Pill>{airline}</Pill>
						) : null}
					</div>
				</div>
				<div>
					{(idValues?.container_size || data?.container_size)
                    && <Pill>{idValues?.container_size || data?.container_size}</Pill>}
					{(idValues?.container_type || data?.container_type)
                    && <Pill>{idValues?.container_type || idValues?.container_type || data?.container_type }</Pill>}
					{(idValues?.commodity || data?.commodity) && <Pill>{idValues?.commodity || data?.commodity}</Pill>}
					{(idValues?.trade_type || data?.trade_type)
                    && <Pill>{idValues?.trade_type || data?.trade_type}</Pill>}
				</div>
			</div>
			<NestedLayout
				controls={marginControls}
				control={control}
				errors={errors}
				customFieldArrayControls={customFieldArrayControls}
			/>
		</div>
	);
}
export default Margin;
