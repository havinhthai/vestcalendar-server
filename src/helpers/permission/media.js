module.exports = {
  groupName: 'Media',
  permissions: [
    {
      path: '/admin/media',
      method: 'get',
      name: 'GET_LIST_MEDIA_YOURSELF',
    },
    {
      path: '/admin/media',
      method: 'get',
      name: 'GET_LIST_MEDIA_ALL',
    },
    {
      path: '/admin/media/api/images',
      method: 'get',
      name: 'GET_LIST_MEDIA_BROWSER_YOURSELF',
    },
    {
      path: '/admin/media/api/images',
      method: 'get',
      name: 'GET_LIST_MEDIA_BROWSER_ALL',
    },
    {
      path: '/admin/media',
      method: 'post',
      name: 'UPLOAD_MEDIA',
    },
    {
      path: '/admin/media/*',
      method: ['get', 'put'],
      name: 'EDIT_MEDIA',
    },
    {
      path: '/admin/media/*',
      method: 'delete',
      name: 'DELETE_MEDIA',
    },
  ],
};
