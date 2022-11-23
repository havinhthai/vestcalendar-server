module.exports = {
  groupName: 'Setting',
  permissions: [
    {
      path: '/admin/info',
      method: ['get', 'put'],
      name: 'EDIT_WEBSITE_INFO',
    },
  ],
};
