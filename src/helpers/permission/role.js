module.exports = {
  groupName: 'Role',
  permissions: [
    {
      path: '/admin/roles',
      method: 'get',
      name: 'VIEW_LIST_ROLE',
    },
    {
      path: '/admin/roles/add',
      method: ['get', 'post'],
      name: 'CREATE_ROLE',
    },
    {
      path: '/admin/roles/*',
      method: ['get', 'put'],
      name: 'EDIT_ROLE',
    },
    {
      path: '/admin/roles/*',
      method: 'delete',
      name: 'DELETE_ROLE',
    },
  ],
};
