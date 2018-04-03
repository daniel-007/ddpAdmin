/*
 *
 * 标签数据状态
 *
 */
import Service from '~/plugins/axios';

export const state = () => {
    return {
        root: false,
        current: {},
        data: { data: [], pagination: {} }
    }
}

export const mutations = {
    EDIT_ROOT_STATUS(state, status) {
        state.root = status
    },
    GET_LIST_SUCCESS(state, action) {
        state.root = true
        state.data = action.result;
    },
    GET_LIST_FAILURE(state) {
        state.root = true
        state.data = { data: [], pagination: {} }
    },
    GET_ITEM_LIST_SUCCESS(state, action) {
        state.root = true
        state.current = action.result;
    },
    GET_ITEM_LIST_FAILURE(state) {
        state.root = true
        state.current = {
            name: '',
            slug: '',
            description: '',
            extends: []
        };
    }
}

export const actions = {
    // 创建
    async create({ commit }, params) {
        try {
            return await Service.post('/blog/tag/create', params);
        } catch (err) {
            return { err }
        }
    },
    // 列表
    async lists({ commit }, params = { per_page: 1000 }) {
        commit('EDIT_ROOT_STATUS', false);
        try {
            let res = await Service.get('/blog/tag/lists', { params })
            if (res.data && res.data.code === 1) {
                commit('GET_LIST_SUCCESS', res.data)
            } else if (res.data && res.data.code === 2) {
                commit('EDIT_ROOT_STATUS', false)
            } else {
                commit('GET_LIST_FAILURE')
            }
        } catch (err) {
            commit('GET_LIST_FAILURE')
        }
    },
    // 删除
    async del({ commit }, params) {
        try {
            return await Service.post('/blog/tag/del', params);
        } catch (err) {
            return { err }
        }
    },
    // 查找单个用户
    async find({ commit }, params) {
        commit('EDIT_ROOT_STATUS', false);
        try {
            let res = await Service.get('/blog/tag/find', { params })
            if (res.data && res.data.code === 1) {
                commit('GET_ITEM_LIST_SUCCESS', res.data)
            } else if (res.data && res.data.code === 2) {
                commit('EDIT_ROOT_STATUS', false)
            } else {
                commit('EDIT_ROOT_STATUS', true)
            }
        } catch (err) {
            commit('EDIT_ROOT_STATUS', true)
        }
    },
    // 编辑
    async edit({ commit }, params) {
        try {
            return await Service.post('/blog/tag/edit', params);
        } catch (err) {
            return { err }
        }
    }
}