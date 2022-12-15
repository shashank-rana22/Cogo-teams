import { Button } from '@cogoport/components';
import { useForm, SelectController } from '@cogoport/components/src/forms';
import { startCase } from '@cogoport/utils';

import BookingSources from '../../../commons/configs/BookingSources';
import States from '../../../commons/configs/States';

import styles from './styles.module.css';

function Content() {
	const { control } = useForm({});
	return (
		<div className={styles.container}>
			<div className={styles.button_wrapper}>
				<Button className="clear_filter_button">Clear Filters</Button>
				<Button className="apply_button">Apply</Button>
			</div>

			<form className={styles.form_wrapper}>
				<label>Customer/Channel Partner</label>
				<SelectController
					control={control}
					name="importer_exporter_id"
					options={[]}
					placeholder="Select Customer/Channel Partner"
				/>

				<label>KAM</label>
				<SelectController
					control={control}
					name="stakeholder_id"
					placeholder="Select KAM"
					options={[]}
				/>

				<label>Raised Alarm?</label>
				<SelectController
					control={control}
					name="fault_alarms_raised"
					placeholder="Select status"
					options={[{
						label : 'YES',
						value : 'active',
					}]}
				/>

				<label>Source</label>
				<SelectController
					control={control}
					name="source"
					placeholder="Select Source"
					options={BookingSources.map((source) => ({
						label : startCase(source),
						value : source,
					}))}
				/>

				<label>Origin Port</label>
				<SelectController
					control={control}
					name="origin_port_id"
					options={[]}
					placeholder="Select Origin"
				/>

				<label>Destination Port</label>
				<SelectController
					control={control}
					name="destination_port_id"
					options={[]}
					placeholder="Select Destination"
				/>

				<label>Container Size</label>
				<SelectController
					control={control}
					name="container_size"
					label="Container Size"
					options={[]}
					placeholder="Select Container Size"
				/>

				<label>Container Type</label>
				<SelectController
					control={control}
					name="container_type"
					label="Container Type"
					options={[]}
					placeholder="Select Container Type"
				/>

				<label>Trade Type</label>
				<SelectController
					control={control}
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

				<label>State</label>
				<SelectController
					control={control}
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
