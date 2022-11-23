module.exports = {
  groupName: 'Administrator',
  permissions: [
    {
      path: '/admin/administrators',
      method: 'get',
      name: 'VIEW_LIST_ADMINISTRATOR',
    },
    {
      path: '/admin/administrators/add',
      method: ['get', 'post'],
      name: 'CREATE_ADMINISTRATOR',
    },
    {
      path: '/admin/administrators/*',
      method: ['get', 'put'],
      name: 'EDIT_ADMINISTRATOR',
    },
  ],
};
