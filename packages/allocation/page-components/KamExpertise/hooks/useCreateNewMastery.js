import { useForm } from "@cogoport/forms";
import controls from "../configurations/get-add-mastery";

function useCreateNewMastery() {
    const formProps = useForm();
    
    return {
        formProps,
        controls,
    }   
}

export default useCreateNewMastery