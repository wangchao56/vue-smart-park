import CustomIcon from "./CustomIcon.vue";
import AuthComponent from "./AuthComponent.vue";
import EchartComp from "./EchartComp.vue";
import BaseTable from "./BaseTable.vue";

const components: Record<string, any> = {
    CustomIcon,
    AuthButton: AuthComponent,
    EchartComp,
    BaseTable
}

export default components;
