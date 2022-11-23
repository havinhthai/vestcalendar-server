module.exports = {
  groupName: 'User',
  permissions: [
    {
      path: '/admin/users',
      method: 'get',
      name: 'VIEW_LIST_USER',
    },
    {
      path: '/admin/users/*',
      method: 'get',
      name: 'VIEW_USER_DETAIL',
    },
    {
      path: '/admin/users/*',
      method: 'put',
      name: 'EDIT_USER',
    },
  ],
};
