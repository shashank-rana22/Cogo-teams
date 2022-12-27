import {useSelector} from "@cogoport/store"

const useGetCountry=()=>{
    const {profile}=useSelector((state)=>state)

	const { country } = profile?.partner || {};

    if(country){
        return country
    }

    return { country_code: 'IN', currency_code: 'USD', mobile_country_code: '+91' };

}
export default useGetCountry