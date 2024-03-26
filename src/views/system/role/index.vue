<template>

    <div class="role-container">
        <div class="left-wrapper">
            <div v-for="(item, index)  in roleList" :key="item.roleId" class="role-item"
                :class="{ active: index === activeIndex }" @click="changeRole(index)">
                <div class="role-info">
                    <svg-icon icon-class="user" class="icon" />
                    {{ item.roleName }}
                </div>
                <div class="more">
                    <svg-icon icon-class="more" />
                </div>
            </div>
            <el-button class="addBtn">添加角色</el-button>
        </div>

        <div class="right-wrapper">
            <el-tabs v-model="activeName">
                <el-tab-pane label="功能权限" name="tree">
                    <div class="tree-wrapper">
                        <div v-for="item in treeList" :key="item.id" class="tree-item">
                            <!-- title -->
                            <div class="tree-title">{{ item.title }}</div>
                            <!-- 树形结构 -->
                            <el-tree ref="treeRef" :props="{ label: 'title' }" :data="item.children" show-checkbox
                                :default-expand-all="true" node-key="id" />
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="`成员列表(${roleUserList.length})`" name="member">
                    <div class="user-wrapper">
                        <el-table :data="roleUserList" style="width: 100%">
                            <el-table-column type="index" width="250" label="序号" />
                            <el-table-column prop="name" label="员工姓名" />
                            <el-table-column prop="userName" label="登录账号" />
                        </el-table>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { GetAllPermission, GetRoleList, GetRoleDetail, GetRoleUserList } from '@/services';

const treeList = ref([])
const activeName = ref('tree')
const roleList = ref([])
//当前角色的权限列表 
const rolePermissionList = ref([])

const activeIndex = ref(0)
const treeRef = ref(null)

//当前角色的用户ID
const roleId = ref('')

const roleUserList = ref([])
// 递归处理函数
function addDisabled(treeList) {
    treeList.forEach(item => {
        item.disabled = true
        // 递归处理
        if (item.children) {
            addDisabled(item.children)
        }
    })
}
onMounted(async () => {
    const res = await GetAllPermission()
    console.log('res: ', res);
    treeList.value = res.data
    addDisabled(treeList.value)

    const roleRes = await GetRoleList()
    console.log('roleRes: ', roleRes);
    roleList.value = roleRes.data
})

//获取角色详情
async function getRoleDetail() {
    const res = await GetRoleDetail(roleId.value)
    console.log('res: ', res);
    rolePermissionList.value = res.data.perms;

    //设置高亮
    nextTick(() => {
        console.log('treeRef.value: ', treeRef.value);
        treeRef.value.forEach((node, index) => {
            node.setCheckedKeys(unref(rolePermissionList)[index])
        })
    })
}
//获取角色成员列表
const getRoleUserListHandler = async (roleId: string | number) => {
    const _params = {
        page: 1,
        pageSize: 10,
    }
    const res = await GetRoleUserList(roleId, _params)
    roleUserList.value = res.data.rows
}

//切换角色
function changeRole(index: number) {
    activeIndex.value = index;
    roleId.value = roleList.value[index].roleId
    getRoleDetail()
    //获取角色成员列表
    getRoleUserListHandler(roleId.value)
}



</script>
<style lang='scss' scoped>
.role-container {
    display: flex;
    font-size: 14px;
    background-color: #fff;
    padding: 20px;

    .left-wrapper {
        width: 200px;
        border-right: 1px solid #e4e7ec;
        padding: 4px;
        text-align: center;

        .role-item {
            position: relative;
            height: 56px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            cursor: pointer;

            &.active {
                background: #edf5ff !important;
                color: #4770ff !important;
            }
        }

        .role-info {
            display: flex;
            align-items: center;

            .icon {
                margin-right: 10px;
            }
        }

        .more {
            display: flex;
            align-items: center;
        }

        .addBtn {
            width: 100%;
            margin-top: 20px;
        }
    }

    .right-wrapper {
        flex: 1;

        .tree-wrapper {
            display: flex;
            justify-content: space-between;

            .tree-item {
                flex: 1;
                border-right: 1px solid #e4e7ec;
                padding: 0px 4px;
                text-align: center;

                .tree-title {
                    background: #f5f7fa;
                    text-align: center;
                    padding: 10px 0;
                    margin-bottom: 12px;
                }
            }
        }

        ::v-deep .el-tabs__nav-wrap {
            padding-left: 20px;
        }

        .user-wrapper {
            padding: 20px;
        }
    }
}
</style>
