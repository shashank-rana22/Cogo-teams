import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/form';
import SelectController from '@cogoport/form/Controlled/SelectController';
import { startCase } from '@cogoport/utils';

import BookingSources from '../../../commons/configs/BookingSources';
import States from '../../../commons/configs/States';

import styles from './styles.module.css';

function Content() {
	const methods = useForm({});
	return (
		<div className={styles.container}>
			<div className={styles.button_wrapper}>
				<Button className="clear_filter_button">Clear Filters</Button>
				<Button className="apply_button">Apply</Button>
			</div>

			<form className={styles.form_wrapper}>
				<SelectController
					methods={methods}
					name="importer_exporter_id"
					options={[]}
					label="Customer/Channel Partner"
					placeholder="Select Customer/Channel Partner"
				/>
				<SelectController
					methods={methods}
					name="stakeholder_id"
					placeholder="Select KAM"
					options={[]}
					label="KAM"
				/>
				<SelectController
					methods={methods}
					name="fault_alarms_raised"
					label="Raised Alarm?"
					placeholder="Select status"
					options={[{
						label : 'YES',
						value : 'active',
					}]}
				/>
				<SelectController
					methods={methods}
					label="Source"
					name="source"
					placeholder="Select Source"
					options={BookingSources.map((source) => ({
						label : startCase(source),
						value : source,
					}))}
				/>
				<SelectController
					methods={methods}
					name="origin_port_id"
					label="Origin Port"
					options={[]}
					placeholder="Select Origin"
				/>
				<SelectController
					methods={methods}
					name="destination_port_id"
					label="Destination Port"
					options={[]}
					placeholder="Select Destination"
				/>
				<SelectController
					methods={methods}
					name="container_size"
					label="Container Size"
					options={[]}
					placeholder="Select Container Size"
				/>
				<SelectController
					methods={methods}
					name="container_type"
					label="Container Type"
					options={[]}
					placeholder="Select Container Type"
				/>
				<SelectController
					methods={methods}
					name="trade_type"
					label="Trade Type"
					options={[
						{
							label : 'Import',
							value : 'import',
						},
						{
							label : 'Export',
							value : 'export',
						},
					]}
					placeholder="Select Trade Type"
				/>
				<SelectController
					methods={methods}
					name="state"
					label="State"
					options={States}
					placeholder="Select State"
				/>
			</form>
		</div>
	);
}
export default Content;
