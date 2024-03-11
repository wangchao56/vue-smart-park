import CustomIcon from "./CustomIcon.vue";
import AuthComponent from "./AuthComponent.vue";

import EchartComp from "./EchartComp.vue";

const components: Record<string, any> = {
    CustomIcon,
    AuthButton: AuthComponent,
    EchartComp
}

export default components;
