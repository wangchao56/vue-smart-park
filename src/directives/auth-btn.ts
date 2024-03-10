import { useAuthStore } from "@/store";
// 管理员权限特殊处理
const adminPerms = '*:*:*'
export default {
    beforeMount(el: any, binding: any) {
        const authStore = useAuthStore();
        const auth = binding.value;
        const hasPermission = !authStore.profile.permissions.includes(auth) && !authStore.profile.permissions.includes(adminPerms);
        if (hasPermission) {
            el.style.display = "none";
        }
    },
};
