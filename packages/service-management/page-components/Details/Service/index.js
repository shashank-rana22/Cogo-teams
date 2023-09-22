import { Loader, cl, Button } from '@cogoport/components';
import { IcMCross, IcMEdit } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { PORT_PAIR_SERVICES } from '../../../common/SERVICES';
import useListOrganizationServiceExpertises from '../../../hooks/useListOrganizationServiceExpertises';
import useListRecommendServiceExpertise from '../../../hooks/useListRecommendServiceExpertise';

import AddServices from './AddServices';
import Footer from './Footer';
import LocationPairs from './LocationPairs';
import Locations from './Locations';
import OptedRecommendedServices from './OptedRecommendedServices';
import RecommendedServices from './RecommendedServices';
import styles from './styles.module.css';

function Service({ item = {}, service_data = {} }) {
	const { data = {}, loading = false, filters = {}, setFilters = () => { } } = useListOrganizationServiceExpertises({
		defaultFilters: {
			organization_id : item?.organization_id,
			service_type    : item?.requested_service?.service,
		},
		defaultParams: { location_details_required: true },
	});
	const [isEdit, setIsEdit] = useState(false);
	const [show, setShow] = useState(false);
	const [selected, setSelected] = useState([]);

	const prefill = Object.keys(data?.list || [])?.map((val) => {
		const key = data?.list?.[val];
		if (key?.location_id) {
			return {
				location_id : key?.location_id,
				trade_type  : key?.trade_type,
				location    : {
					name: key?.location?.name,
				},
				total_teus: key?.total_teus,
			};
		}
		return {
			origin_location_id : key?.origin_location_id,
			origin_location    : {
				name: key?.origin_location?.name,
			},
			destination_location_id : key?.destination_location_id,
			destination_location    : {
				name: key?.destination_location?.name,
			},
			total_teus : key?.total_teus,
			user_id    : key?.user_id,
		};
	});
	const { data: expertiseData = {} } = useListRecommendServiceExpertise({
		defaultFilters : { organization_id: item?.organization_id },
		defaultParams  : { service_type: item?.requested_service?.service },
	});
	const { list: expertise = [] } = expertiseData;
	const RenderPreview = PORT_PAIR_SERVICES.includes(item?.requested_service?.service)
		? LocationPairs
		: Locations;

	if (loading) return <Loader themeType="secondary" />;

	return (
		<div className={styles.container}>
			<div className={styles.request_title}>Requested service</div>
			<div className={styles.details}>
				<div className={styles.service_name}>
					Add
					{' '}
					{startCase(item?.requested_service?.service)}
				</div>
				<div className={styles.service_title}>
					{isEdit && (
						<Button
							themeType="secondary"
							onClick={() => !isEmpty(expertise) && setShow(!show)}
							style={{
								cursor    : isEmpty(expertise) && 'not-allowed',
								fontStyle : 'italic',
							}}
						>
							Add recommended services
						</Button>
					)}
				</div>
				{!isEmpty(selected) && isEdit && (
					<OptedRecommendedServices
						selected={selected}
						service={item?.requested_service?.service}
					/>
				)}

				<div className={styles.edit_wrap}>
					<div className={styles.title}>Location Pairs</div>
					<Button
						className={cl`${styles.primary} ${styles.sm}`}
						onClick={() => setIsEdit(!isEdit)}
					>
						{isEdit ? 'Cancel' : 'Edit'}
						{isEdit ? (
							<IcMCross
								size={1}
								style={{ marginLeft: '4px', color: '#fff' }}
							/>
						) : (
							<IcMEdit
								size={1}
								style={{ marginLeft: '4px', color: '#fff' }}
							/>
						)}
					</Button>
				</div>

				{!isEdit ? (
					<div className={styles.preview}>
						<RenderPreview
							locations={prefill}
							service={item?.requested_service?.service}
							data={data}
							filters={filters}
							setFilters={setFilters}
						/>
					</div>
				) : (
					<div className={styles.add_services}>
						<AddServices
							service_type={item?.requested_service?.service}
							org_id={item?.organization_id}
							setIsEdit={setIsEdit}
							selected={selected}
							data={data}
							isEdit={isEdit}
							locations_prefill={prefill}
							service_data={service_data}
						/>
					</div>
				)}

				<div className={styles.footer}>
					<Footer service={item?.requested_service} />
				</div>
			</div>

			<div className={styles.recommended_services}>
				<RecommendedServices
					service_type={item?.requested_service?.service}
					selected={selected}
					set_selected={setSelected}
					organization_id={item?.organization_id}
					list={expertise}
					show={show}
					set_show={setShow}
				/>
			</div>
		</div>

	);
}
export default Service;
