/* eslint-disable */

if (typeof Dropzone !== 'undefined') {
  Dropzone.autoDiscover = false;
}

const handleAjaxError = (status, responseText) => {
  if (status === 400) {
    console.log('URL Not Found');
  }
  if (status === 403) {
    Swal.fire({
      title: 'Forbidden!',
      text: "You don't have permission",
      type: 'error',
    });
  }
  if (status === 500) {
    Swal.fire({
      title: 'Failed!',
      text: "Something went wrong",
      type: 'error',
    });
    console.log(JSON.parse(responseText));
  }
}

const queryParamsToObj = () => {
  if (!location.search) return;

  const search = location.search.substring(1);

  return JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
}

const configColorPicker = () => {
  if (typeof ($.fn.colorpicker) === 'undefined') return;

  $('.input-colorpicker').colorpicker()

  $('.input-colorpicker').on('colorpickerChange', function (event) {
    $(this).find('.fa-square').css('color', event.color.toString());
  });
};

const configSelect2 = () => {
  if (typeof ($.fn.select2) === 'undefined') return;

  $('.select2').select2();

  $('.select2-tags').select2({ tags: true });

  const $selectSizes = $('.select2-sizes');

  if ($selectSizes.length === 0) return;

  let sizes = ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'];

  sizes = sizes.filter(function (obj) { return $selectSizes.val().indexOf(obj) == -1; })

  $selectSizes.select2({ tags: sizes });
};

const configDropZone = () => {
  if (typeof Dropzone === 'undefined') return;

  const dz = new Dropzone('#upload', {
    url: '/admin/media',
  });

  const $imageList = $('#image__list--store');
  if ($imageList.length > 0) {
    dz.on('success', function (file, { payload }) {
      $imageList.prepend(`
        <img
          src="${payload.location}"
          title="${payload.name}"
          data-id="${payload._id}"
          class="image__item--store">
      `);

      const $imageItems = $('.image__item--store');

      $imageItems.off("click");
      $imageItems.click(function () {
        if (!isMultiImages) {
          $imageItems.removeClass('active');
        }

        $(this).toggleClass('active');

        if (opener && opener.CKEDITOR) {
          window.opener.CKEDITOR.tools.callFunction(queryParamsToObj()['CKEditorFuncNum'], $(this).attr('src'));

          window.close();
        } else if (!isMultiImages) {
          // Handle choose single images
        } else {
          // Handle choose multi images
        }
      });
    });
  }

  const $tBody = $('#table-body');
  if ($tBody.length > 0) {
    dz.on('success', function (file, { payload }) {
      const date = new Date(payload.createdAt);

      $tBody.prepend(`
      <tr>
        <td class="text-center index-count">
          <span class="badge badge-danger">New</span>
        </td>
        <td>
          <a href="/admin/media/${payload._id}">
            <img src="${payload.location}" class="img--manage__box" title="${payload.name}">
          </a>
        </td>
        <td>
          <a href="/admin/media/${payload._id}">
            ${payload.name}
          </a>
        </td>
        <td>
          ${(payload.size / 1024).toFixed(2)} kB
        </td>
        <td>
          <a href="/admin/media?mimetype=0" class="badge badge-pill badge-secondary">
            ${payload.mimeType}
          </a>
        </td>
        <td>
          ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}
        </td>
      </tr>
    `);
    });
  }
}

const toggleShowDropzone = () => {
  const $btnToggleUpload = $('#btn-toggle-upload');
  const $upload = $('#upload');

  $btnToggleUpload.click(function () {
    if ($upload.hasClass('d-none')) {
      $upload.removeClass('d-none').slideToggle();

      return;
    }

    $upload.slideToggle();
  });
}

const configDateTimePicker = () => {
  const $element = $('.date-time-picker');

  if ($element.length === 0) return;

  $element.datetimepicker({
    format:'d/m/Y H:i',
    // minDate: new Date(),
  });
};

const editSlug2 = () => {
  if (!$('label').hasClass('lb-edit')) return;

  const $lbEdit = $('.lb-edit');
  const $slug = $('input[name=slug]');
  const $slugRef = $('.slug-ref');

  let isDisabled = true;

  $lbEdit.click(function a() {
    if (isDisabled) {
      $slug.attr('readonly', false);
      isDisabled = false;

      return;
    }

    isDisabled = true;
    $slug.attr('readonly', true);
  });

  $slugRef.keyup(function () {
    const title = $(this).val();

    if (title === '') {
      $slug.val('');
    } else {
      const token = Math.random().toString(36).substr(7);

      $slug.val(getSlug(title, { lang: 'vn' }) + '-' + token);
    }
  });
}

const btnConfirmLogout = () => {
  const $btnConfirmLogout = $('.btn-confirm-logout');

  if ($btnConfirmLogout.length === 0) return;

  if (typeof Swal === 'undefined') {
    console.error('Swal not found');
    return;
  }

  const logoutHref = $btnConfirmLogout.data('href');

  $btnConfirmLogout.click(function() {
    Swal.fire({
      title: 'Are you sure?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      confirmButtonText: 'Logout',
    }).then((result) => {
      if (result.value) {
        location.href = logoutHref;
      }
    });
  });
}

const btnReqDelete = () => {
  const $btnDelete = $('.btn-req-delete');

  if ($btnDelete.length === 0) return;

  if (typeof Swal === 'undefined') {
    console.error('Swal not found');
    return;
  }

  $btnDelete.click(function() {
    const $that = $(this);

    const isDeleted = $that.data('is-deleted');

    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      confirmButtonText: `Yes, ${!isDeleted ? 'deleted' : 'restored'} it!`,
    }).then((result) => {
      if (result.value) {
        $.ajax({
          url: $that.data('url'),
          type: 'DELETE',
          dataType: 'json',
          success: function ({ payload }) {
            const type = $that.data('type');

            Swal.fire({
              title: !isDeleted ? 'Deleted!' : 'Restore!',
              text: `Your ${type || 'post'} has been ${!isDeleted ? 'deleted' : 'restored'}.`,
              type: 'success',
              onClose: () => {
                const hrefRedirect = $that.data('href-redirect');

                if (hrefRedirect) {
                  setTimeout(function () {
                    location.href = hrefRedirect;
                  }, 200);

                  return;
                }

                const $parentId = $that.data('parent-id');

                let $txtDeletedAt = $('#txt-deleted-at');
                let $dynamicDisable = $('.dynamic-disable');
                let $collapse = $('.collapse.dynamic-hide');

                if ($parentId) {
                  $txtDeletedAt = $(`#${$parentId} #txt-deleted-at`);
                  $dynamicDisable = $(`#${$parentId} .dynamic-disable`);
                  $collapse = $(`#${$parentId} .collapse.dynamic-hide`);
                }

                if (isDeleted) {
                  $txtDeletedAt.val('');
                  $dynamicDisable.removeClass('disabled');
                  $dynamicDisable.attr('disabled', false);

                  $that.addClass('btn-danger').removeClass('btn-success').text('Delete');
                  $that.data('is-deleted', false);

                  $that.parent()
                    .siblings('.badged-delete-box')
                    .empty()
                    .append('<span class="badge bg-success">Subscribe</span>');
                } else {
                  const dateDeleted = new Date(payload.deletedAt);
                  const deletedAt = `${dateDeleted.getDate()}/${dateDeleted.getMonth() + 1}/${dateDeleted.getFullYear()}`;

                  $txtDeletedAt.val(deletedAt);
                  $dynamicDisable.addClass('disabled');
                  $dynamicDisable.attr('disabled', 'disabled');
                  $collapse.collapse('hide');

                  $that.addClass('btn-success').removeClass('btn-danger').text('Restore');
                  $that.data('is-deleted', true);

                  $that.parent()
                    .siblings('.badged-delete-box')
                    .empty()
                    .append(`<span class="badge bg-danger">UnSubscribe</span> - ${deletedAt}`);
                }
              },
            });
          },
          error: function (xhr) {
            handleAjaxError(xhr.status, xhr.responseText);
          }
        });
      }
    });
  });
}

const validatePasswordForm = () => {
  const $form = $('.validatePasswordForm');

  if ($form.length === 0) return;

  const $password = $form.find('.txtPassword');
  const $confirmPassword = $form.find('.txtConfirmPassword');

  if ($password.length === 0 || $confirmPassword.length === 0) return;

  $form.submit(function(e) {
    if ($password.val() !== $confirmPassword.val()) {
      e.preventDefault();

      $('.alert-validte-password').remove();

      $confirmPassword.parent().append(`
        <span class="alert-validte-password text-danger">
          Password does not match
        </span>
      `);

      $password.focus();

      return;
    }
  });
}

const headerActive = () => {
  const $navLink = $('.nav .nav-link');

  $navLink.each(function() {
    const href = $(this).attr('href');

    if (href === 'javascript:void(0)') return;

    if (href === location.pathname) {
      if ($(this).parent().parent().parent().hasClass('has-treeview')) {
        $(this).parent().parent().parent().addClass('menu-open');
        $(this).parent().parent().siblings().addClass('active');
      }

      $(this).addClass('active');
    }
  });
}

/*-------- Image management --------*/
const $imageItems = $('.image__item--store');

const $btnSaveChange = $('#btn-save-change');

// variables for single image
let $pickedImageInput = $('.picked__image--input');
let $pickedImageTag = $('.picked__image--img');
let $pickedImageLabel = $('.picked__image--label');

// variables for multiple image
let $pickedImages = $('.picked__images');
let isMultiImages = false;
let pickedImagesInputName = '';

let queryParams = {};
let currentPage = 1;

const btnSelectImage = () => {
  $('body').on('click', '.btn-select-image', function () {
    const $imageItems = $('.image__item--store');
    $imageItems.removeClass('active');

    $groupImage = $(this).parents('.form-group-image:first');
    isMultiImages = $(this).data('multiple');
    pickedImagesInputName = $(this).data('input-name');

    if (!isMultiImages) {
      $pickedImageInput = $groupImage.find('.picked__image--input');
      $pickedImageTag = $groupImage.find('.picked__image--img');
      $pickedImageLabel = $groupImage.find('.picked__image--label');
    } else {
      $pickedImages = $groupImage.find('.picked__images');
    }
  });
};

const onSearchImages = () => {
  const $ipSearchImage = $('#ip__search--image');
  const $btnSearchImage = $('#btn__search--image');

  $ipSearchImage.keypress(function(e) {
    if (e.which === 13) {
      queryParams.q = $ipSearchImage.val();
      currentPage = 1;
      fetchImages({ q: $ipSearchImage.val(), page: 1 });
    }
  });

  $btnSearchImage.click(function() {
    queryParams.q = $ipSearchImage.val();
    currentPage = 1;
    fetchImages({ q: $ipSearchImage.val(), page: 1 });
  });
}

const onPaginationImages = (totalItems, offset) => {
  const $pagination = $('#pagination-custom');

  if ($pagination.length === 0) return;
  $pagination.empty();

  const totalPage = Math.ceil(totalItems / offset);

  let i = 1;

  for (i; i <= totalPage; i = i + 1) {
    const classActive = currentPage === i ? 'active disabled' : '';

    $pagination.append(`
      <li class="page-item pagination__item-custom ${classActive}">
        <a class="page-link" href="javascript:void(0)">${i}</a>
      </li>
    `);
  }

  const $paginationItem = $('.pagination__item-custom');

  $paginationItem.click(function () {
    if ($(this).hasClass('active')) return;

    currentPage = +$(this).text();
    queryParams.page = currentPage;

    fetchImages(queryParams);
  });
}

const fetchImages = (dataQuery = {}) => {
  const $imageList = $('#image__list--store');

  if ($imageList.length === 0) return;

  $imageList.empty();

  const offset = $imageList.data('offset');

  $.get(`/admin/media/api/images?offset=${offset}`, dataQuery, function ({ data, pagination }, status) {
    if (status !== 'success') return;

    data.forEach(function (image) {
      $imageList.append(`
          <img src="${image.location}" title="${image.name}" data-id="${image._id}" class="image__item--store">
        `);
    });

    onPaginationImages(pagination.totalItems, offset);

    const $imageItems = $('.image__item--store');

    $imageItems.click(function () {
      if (!isMultiImages) {
        $imageItems.removeClass('active');
      }

      $(this).toggleClass('active');

      if (opener && opener.CKEDITOR) {
        window.opener.CKEDITOR.tools.callFunction(queryParamsToObj()['CKEditorFuncNum'], $(this).attr('src'));

        window.close();
      } else if (!isMultiImages) {
        // Handle choose single images
      } else {
        // Handle choose multi images
      }
    });
  });
}

const btnSaveChange = () => {
  $btnSaveChange.click(function () {
    if (!isMultiImages) {
      const location = $('.image__item--store.active').attr('src');

      $pickedImageTag.attr('src', location);

      $pickedImageLabel.val(location);
      $pickedImageLabel.attr('title', location);

      $pickedImageInput.val(location);
      $pickedImageInput.next('.text-danger').remove();
    } else {
      $('.image__item--store.active').each(function () {
        const location = $(this).attr('src');
        const idImage = $(this).data('id');

        $pickedImages.append(`<div class="col-md-4 picked__image--group">
            <a href="#" class="close" />
            <img src="${location}" class="img-fluid rounded" style="margin-bottom: 15px;border: 1px solid #ccc;">
            <input type="hidden" name="${pickedImagesInputName}" value="${location}">
          </div>`);
      });
    }
  });
}

const configMultiImages = () => {
  $('.picked__images').on('click', '.picked__image--group .close', function (e) {
    e.preventDefault();
    const pickedImages = $(this).parents('.picked__images');

    $(this).parent().remove();
    if (pickedImages.find('.picked__image--group').length === 0) {
      pickedImages.find('.preview-group').addClass('hide');
    }
  });

  $('.picked__images').on('click', '.picked__image--group img', function () {
    const location = $(this).attr('src');

    $(this).parents('.picked__images').find('.preview-img').attr('src', location);
    $(this).parents('.picked__images').find('.preview-group').removeClass('hide');
  });
}

/*-------- End Image management --------*/

const validateImage = ($parentForm) => {
  let isValid = true;

  $pickedImageInput = $parentForm.find('.picked__image--input');

  $pickedImageInput.each(function () {
    if ($(this).data('required') && $(this).val() === '') {
      isValid = false;

      $(this).next('.text-danger').remove();

      $(this).after(`<span class="text-danger">Please choose image!</span>`);

      const $collapse = $(this).parents('.collapse:first');

      if ($collapse.length !== 0) {
        $collapse.collapse('show');
      }

      $(this).parents('.form-group-image:first').find('.btn-select-image').focus();

      return false;
    }
  });

  return isValid;
}

const validateForm = () => {
  const $form = $('#main_form');

  $form.submit(function(e) {
    const isValid = validateImage($(this));
    if (!isValid) {
      return false;
    }
  });
}

const configCKE = () => {
  const $editor = $('#editor');

  if (!window.CKEDITOR || !$editor.length) return;


  CKEDITOR.replace('editor', {
    language: 'vn',
    height: 500,
    filebrowserImageBrowseUrl: '/admin/media/browser/images',
  });

  const $form = $editor.closest('form');

  const ckeInstance = CKEDITOR.instances['editor'];

  ckeInstance.on('key', function (e) {
    const $editorAlertContent = $('#editor-alert-content');

    $editorAlertContent.remove();
  });

  $form.submit(function (e) {
    if ($editor.data('required')) {
      const content = ckeInstance.getData().replace(/<[^>]*>/gi, '').length;

      if (!content) {
        ckeInstance.focus();

        const $editorAlertContent = $('#editor-alert-content');

        if ($editorAlertContent.length === 0) {
          $editor.after(`<span class="text-danger" id="editor-alert-content"><br />Content is required</span>`);

        }

        e.preventDefault();
      }
    }
  });
};

const alertWhenEditing = () => {
  if (!$('form').length === 0) return;

  let isSubmit = false;

  $('form button[type!="button"]').click(function() {
    isSubmit = true;
  });

  $('input, textarea').on('change keyup paste', function() {
    $(window).bind('beforeunload', function () {
      if (isSubmit) return;

      return 'Are you sure you want to leave?';
    });
  });
}

const onChangeShop = () => {
  const $selectShop = $('.select-shop');
  const $selectCategories = $('.select-categories');

  if ($selectShop.length === 0 || $selectCategories.length === 0) return;

  let selectedCategories = [];

  $selectCategories.find('option[selected]').each(function() {
    selectedCategories.push($(this).val())
  });

  const $productLinkFormGroup = $('#product-link-form-group');

  $selectShop.on('change', function() {
    const shop = $(this).val();

    if (shop) {
      // fetch categories by shop
      $.ajax({
        url: `/admin/api/shop-categories?shop=${shop}`,
        type: 'GET',
        success: function ({ payload }) {
          $selectCategories.html('');

          let data = [];
          if (selectedCategories === 0) {
            data = payload.map(e => ({
              id: e._id,
              text: e.name,
            }))
          }
          data = payload.map(e => ({
            id: e._id,
            text: e.name,
            selected: selectedCategories.includes(e._id),
          }))

          $selectCategories.select2({ data });

          selectedCategories = [];
        },
        error: function (xhr) {
          handleAjaxError(xhr.status, xhr.responseText);
        }
      });

      // not required link field when select physical shop
      const shopType = $(this).find(`option[value=${shop}]`).data('type');

      if (shopType === 'PHYSICAL') {
        $productLinkFormGroup.hide();
        $productLinkFormGroup.find('input').prop('disabled', true);
      } else {
        $productLinkFormGroup.show();
        $productLinkFormGroup.find('input').prop('disabled', false);
      }
    }
  });

  $selectShop.trigger('change');
}

const handleCategoryAccordion = () => {
  $accordion = $('.categories-accordion');

  if ($accordion.length === 0) return;

  $accordion.sortable({ handle: '.sortable-handle' });

  $accordion.on('blur', 'input[name=name]', function () {
    const $cardTitle = $(this).parents('.card:first').find('.card-title span').first();

    if ($(this).val()) {
      $cardTitle.text($(this).val());
    }
  });

  $(accordion).on('click', 'a.dynamic-disable[disabled]', function() {
    return false;
  });
};

const btnAddCategory = () => {
  $accordion = $('.categories-accordion');
  $btnAddCategory = $('.btn-add-category');

  if ($btnAddCategory.length === 0 || $accordion.length === 0) return;

  $btnAddCategory.click(function(e) {
    e.preventDefault();
    $.get("/admin/shop-categories/add", function (data) {
      $accordion.find('.collapse').collapse('hide');

      $accordion.append(data);

      $accordion.sortable({ handle: '.sortable-handle' });

      const $lastCard = $accordion.find('.card:last');

      const $txtName = $lastCard.find('input[name=name]');
      const $txtColorPicker = $lastCard.find('.input-colorpicker');

      $txtName.focus();
      $txtColorPicker.colorpicker();

      if (typeof Swal === 'undefined') {
        console.error('Swal not found');
        return;
      }

      const $btnDelete = $lastCard.find('.btn-del-category');

      $btnDelete.click(function(e) {
        e.preventDefault();

        Swal.fire({
          title: 'Are you sure?',
          text: 'You won\'t be able to revert this!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#28a745',
          confirmButtonText: `Yes, delete it!`,
        }).then((result) => {
          if (result.value) {
            $lastCard.remove();

            Swal.fire({
              title: 'Deleted!',
              text: `Your category has been deleted.`,
              type: 'success',
            });
          };
        });
      });
    });
  });
};

const onValidateShopForm = () => {
  const $btnSubmitShop = $('#shop-form .btn-submit-shop');

  if ($btnSubmitShop.length === 0) return;

  $btnSubmitShop.click(function() {
    $input = $('.categories-accordion input');

    $input.each(function() {
      if($(this).is(":invalid")) {
        $(this).parents('.collapse:first').collapse('show');

        return false;
      };
    });
  });
};

const onSubmitShopForm = () => {
  const $shopForm = $('#shop-form');

  if ($shopForm.length === 0) return;

  $shopForm.submit(function() {
    const isValidImage = validateImage($(this));

    if (!isValidImage) {
      return false;
    }

    const $cardCategory = $('.categories-accordion .card');

    $cardCategory.each(function(i, el) {
      $(el).find('input, textarea').each(function() {
        const oldName = $(this).attr('name');

        $(this).attr('name', `categories[${i}][${oldName}]`);
      })
    });
  });
};

const permissionCheckboxShowAll = () => {
  const $checkboxShowNext = $('.checkboxShowNext');

  if ($checkboxShowNext.length === 0) return;

  $checkboxShowNext.each(function () {
    const $checkBox = $(this).children("input[type='checkbox']");

    const $nextCheckBox = $(this).next().first().children("input[type='checkbox']");

    if ($checkBox.is(':checked')) {
      $nextCheckBox.prop('disabled', false);
    } else {
      $nextCheckBox.prop('disabled', true);
    }

    $checkBox.change(function () {
      if ($(this).is(':checked')) {
        $nextCheckBox.prop('disabled', false);
      } else {
        // $nextCheckBox.prop('checked', false)
        $nextCheckBox.prop('disabled', true);
      }
    });
  });
};

const handleSearchForm = () => {
  const $searchForm = $('#search-form');

  if ($searchForm.length === 0) return;

  $searchForm.submit(function () {
    $(this).find(":input")
      .filter(function () { return !this.value; })
      .removeAttr("name");

    return true;
  });

  const $select = $searchForm.find('select');

  if ($select.length === 0) return;

  $select.change(function () {
    $searchForm.submit();
  });
};

const onToggleYearlyCheckbox = () => {
  const $yearlyCheckbox = $('.yearly-checkbox')

  if ($yearlyCheckbox.length === 0) return;

  $yearlyCheckbox.change(function() {
    if ($(this).is(':checked')) {
      $('.year-select').hide();
      $('.year-select select').prop('disabled', true);
    } else {
      $('.year-select').show();
      $('.year-select select').prop('disabled', false);
    }
  });
};

const onTypeShopChange = () => {
  const $shopTypeSelectBox = $('#shop-type-select-box');

  if ($shopTypeSelectBox.length === 0) return;

  const $shopAddressFormGroup = $("#shop-address-form-group")

  $shopTypeSelectBox.change(function () {
    if ($(this).val() === 'ONLINE') {
      $shopAddressFormGroup.hide();
      $shopAddressFormGroup.find('input').prop('disabled', true);
    } else {
      $shopAddressFormGroup.show();
      $shopAddressFormGroup.find('input').prop('disabled', false);
    }
  });

  $shopTypeSelectBox.trigger('change');
}

const onApproveRequestItem = () => {
  const $approveRequestBtn = $('#approve-request-btn');

  if ($approveRequestBtn.length === 0) return;

  $approveRequestBtn.click(function(e) {
    e.preventDefault();

    Swal.fire({
      title: 'Are you sure?',
      text: 'You cannot undo after accepting',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      confirmButtonText: 'Accept',
    }).then((result) => {
      if (result.value) {

        const $id = $('#request-id').val();

        $.ajax({
          method: 'POST',
          url: `/admin/requests/approve/${$id}`,
          dataType: 'json',
          success: (response) => {
            console.log('response', response);
            Swal.fire({
              title: 'Accepted',
              text: `${response.message}`,
              type: 'success',
            }).then(() => {
              window.location.href = '/admin/requests';
            });;
          },
          error: (error) => {
            Swal.fire({
              title: 'Error',
              text: `${error.responseJSON.message}`,
              type: 'error',
            });
          }
        });
      };
    });
  });
}

const onRejectRequestItem = () => {
  const $rejectRequestBtn = $('#reject-request-btn');

  if ($rejectRequestBtn.length === 0) return;

  $rejectRequestBtn.click(function(e) {
    e.preventDefault();

    Swal.fire({
      title: 'Are you sure?',
      text: 'You cannot undo after accepting',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      confirmButtonText: 'Accept',
    }).then(async (result) => {
      if (result.value) {
        const $id = $('#request-id').val();

        $.ajax({
          method: 'POST',
          url: `/admin/requests/reject/${$id}`,
          dataType: 'json',
          success: (response) => {
            Swal.fire({
              title: 'Rejected',
              text: `${response.message}`,
              type: 'success',
            }).then(() => {
              window.location.href = '/admin/requests';
            });
          },
          error: (error) => {
            Swal.fire({
              title: 'Error',
              text: `${error.responseJSON.message}`,
              type: 'error',
            });
          }
        });
      };
    });
  });
}

const onSwitchUnlimitedRarityItem = () => {
  const $rarityForm = $('.rarity-form');

  if ($rarityForm.length === 0) return;

  const $unlimitedSwitch = $('input[name=unlimited]');
  const $maxItem = $('input[name=maxItem]');

  if ($unlimitedSwitch.is(':checked')) {
    $maxItem.prop('disabled', true);
  } else {
    $maxItem.prop('disabled', false);
  }

  $unlimitedSwitch.on('change', function() {
    if ($unlimitedSwitch.is(':checked')) {
      $maxItem.prop('value', '');
      $maxItem.prop('disabled', true);
    } else {
      $maxItem.prop('disabled', false);
    }
  });
}

const onUploadFile = () => {
  const $btnSelectFile = $(`button.btn-select-file`);
  $btnSelectFile.click(function (e) {
    e.preventDefault();
    const $thisBtn = $(this);
    const $fileInput = $('input.file-input');
    $fileInput.click();

    $fileInput.change(function (e) {
      $('.notify-file').remove();
      const formData = new FormData();
      $thisBtn.addClass('button-loading');
      $fileInput.prop('disabled', true);
      const files = e.target.files;
      let isSize = true;

      formData.append('file', files[0]);

      $fileTypeRequire = $('input.value-file').data('file-type');

      if ($fileTypeRequire && files[0] && $fileTypeRequire !== files[0].type) {
        $('.input-file-group').after(`<span class="text-danger notify-file">Invalid File</span>`);
        $thisBtn.removeClass('button-loading');
        $fileInput.prop('disabled', false);
        return;
      }

      axios.post('/admin/media', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(({ data }) => {
        $('input.value-file').val(data.payload.location);
        $('input.file-input').attr('src', data.payload.location);
        $('.input-file-group').after(`<span class="text-success notify-file">Success</span>`);

        $thisBtn.removeClass('button-loading');
        $fileInput.prop('disabled', false);
      })
      .catch(err => {
        $thisBtn.removeClass('button-loading');
        $fileInput.prop('disabled', false);
        $('.input-file-group').after(`<span class="text-danger notify-file">${err.response.data.payload}</span>`);
      });
    });
  });
}

const configSelectTimezone = () => {
  const $selectTimezones = $('.select-timezone');

  if ($selectTimezones.length === 0) return;

  const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  timezones.forEach(timezone => {
    $selectTimezones.append(`<option value="${timezone.value}" ${timezone.value === clientTimezone ? 'selected' : ''}>
      ${timezone.label}
    </option>`);
  });

  const dataSelect = $selectTimezones.data('value');

  if (dataSelect) {
    $selectTimezones.val(dataSelect).change();
  }
}

const handleTimelinesList = () => {
  const $timelinesList = $('.timelines-list');

  if ($timelinesList.length === 0) return;

  const genTimelineItemHtml = (index) => {
    return `
    <div class="card card-default timeline-item mb-4" data-index="${index}">
      <div class="card-header card-header-item">
        <span class="btn-delete-timeline btn-delete-card pull-right" data-index="${index}">
          <i class="fa fa-times-circle"></i>
        </span>
      </div>

      <div class="card-body row">
        <div class="col-md-12 col-xs-12 mb-3 input-group">
          <div class="input-group-prepend">
            <label class="input-group-text">
              <input type="checkbox" class="mr-2" name="distributionTimeline[${index}][isDisplayDate]">Display date
            </label>
          </div>

          <div class="input-group-prepend">
            <label class="input-group-text">
              <input type="checkbox" class="mr-2" name="distributionTimeline[${index}][isDisplayTime]">Display time
            </label>
          </div>

          <input class="form-control date-time-picker" name="distributionTimeline[${index}][time]" placeholder="Date time" required>

          <select class="form-control select-timezone" name="distributionTimeline[${index}][timezone]">
          </select>
        </div>

        <div class="col-md-12 col-xs-12 mb-3">
          <input class="form-control" type="text" name="distributionTimeline[${index}][title]" placeholder="Title" required>
        </div>

        <div class="col-md-12 col-xs-12">
          <input class="form-control" type="text" name="distributionTimeline[${index}][description]" placeholder="Description">
        </div>

        <div class="col-12 js-allocation-in-distribution-list">
          <div class="row mt-3 js-allocation-in-distribution" data-event-index="${index}" data-index="0">
            <div class="col-md-6 col-xs-6">
              <select class="form-control js-list-allocation-reference" name="distributionTimeline[${index}][allocations][0][ref]">
                <option value="-1">Select allocation</option>
              </select>
            </div>

            <div class="col-md-6 col-xs-6 input-group">
              <span class="input-group-prepend">
                <span class="input-group-text">%</span>
              </span>

              <input type="number" min="0" max="100" step="any" class="form-control" name="distributionTimeline[${index}][allocations][0][percent]" placeholder="Allocation percent">

              <span class="btn-delete-allocation-in-distribution btn-delete-card pull-right mt-2 ml-3" data-event-index="${index}" data-index="0">
                <i class="fa fa-times-circle"></i>
              </span>
            </div>
          </div>
        </div>

        <div class="col-12 text-center">
          <button class="mx-auto mt-3 btn btn-default btn-add-allocation-in-distribution" data-event-index="${index}">
            <i class="fa fa-plus" aria-hidden="true"></i>
            Add more vesting
          </button>
        </div>
      </div>
    </div>
    `
  };

  $('.btn-add-timeline').click(function (e) {
    e.preventDefault();

    const index = $('.timeline-item').length;

    $('.timelines-list').append(genTimelineItemHtml(index));

    configDateTimePicker();
    configSelectTimezone();
  });

  $(document).on('click', '.btn-delete-timeline', function (e) {
    e.preventDefault();

    const index = $(this).data('index');
    $(`.timeline-item[data-index="${index}"]`).remove();
  });
}

const handleLinksList = () => {
  const $linksList = $('.links-list');

  if ($linksList.length === 0) return;

  const genLinkItemHtml = (index) => {
    return `
    <div class="card card-default link-item mb-4" data-index="${index}">
      <div class="card-header card-header-item">
        <span class="btn-delete-link btn-delete-card pull-right" data-index="${index}">
          <i class="fa fa-times-circle"></i>
        </span>
      </div>
      <div class="card-body row">
        <div class="col-md-4 col-xs-4">
          <select class="form-control" name="links[${index}][linkType]">
            <option value="website">website</option>
            <option value="white-paper">white-paper</option>
            <option value="twitter">twitter</option>
            <option value="telegram">telegram</option>
            <option value="discord">discord</option>
            <option value="facebook">facebook</option>
            <option value="youtube">youtube</option>
            <option value="linkedin">linkedin</option>
            <option value="medium">medium</option>
            <option value="github">github</option>
            <option value="reddit">reddit</option>
          </select>
        </div>
        <div class="col-md-8 col-xs-8">
          <input class="form-control" type="text" name="links[${index}][url]" placeholder="https://..." required>
        </div>
      </div>
    </div>
  `};

  $('.btn-add-link').click(function (e) {
    e.preventDefault();

    const index = $('.link-item').length;

    console.log(index);
    $('.links-list').append(genLinkItemHtml(index));
  });

  function getDistributionTimelineVestingOptions() {
    const allocationOptions = Array(...document.getElementsByClassName("js-allocation-title")).map(input => input.value)

    $(this).html(`
      <option value="-1">Select allocation</option>
      ${allocationOptions.map((option, index) => option ? `<option value="${index}">${option}</option>` : '')}
    `)
  }

  const genAllocationInDistributionItemHtml = (nextIndex, eventIndex) => {
    return `
    <div class="row mt-3 js-allocation-in-distribution" data-event-index="${eventIndex}" data-index="${nextIndex}">
      <div class="col-md-6 col-xs-6">
        <select class="form-control js-list-allocation-reference" name="distributionTimeline[${eventIndex}][allocations][${nextIndex}][ref]">
          <option value="-1">Select allocation</option>
        </select>
      </div>

      <div class="col-md-6 col-xs-6 input-group">
        <span class="input-group-prepend">
          <span class="input-group-text">%</span>
        </span>

        <input type="number" min="0" max="100" step="any" class="form-control" name="distributionTimeline[${eventIndex}][allocations][${nextIndex}][percent]" placeholder="Allocation percent">

        <span class="btn-delete-allocation-in-distribution btn-delete-card pull-right mt-2 ml-3" data-event-index="${eventIndex}" data-index="${nextIndex}">
          <i class="fa fa-times-circle"></i>
        </span>
      </div>
    </div>
    `
  }

  $('.timelines-list').on('focus', 'select.js-list-allocation-reference', getDistributionTimelineVestingOptions);

  $(document).on('click', '.btn-add-allocation-in-distribution', function (e) {
    e.preventDefault();

    const eventIndex = $(this).data('event-index');
    const nextIndexItem = $(`.timeline-item[data-index="${eventIndex}"] .js-allocation-in-distribution`).length;

    $(`.timeline-item[data-index="${eventIndex}"] .js-allocation-in-distribution-list`).append(genAllocationInDistributionItemHtml(nextIndexItem, eventIndex));
  })

  $(document).on('click', '.btn-delete-allocation-in-distribution', function (e) {
    e.preventDefault();

    const eventIndex = $(this).data('event-index');
    const index = $(this).data('index');

    $(`.js-allocation-in-distribution[data-event-index="${eventIndex}"][data-index="${index}"]`).remove()
  })

  $(document).on('click', '.btn-delete-link', function (e) {
    e.preventDefault();

    const index = $(this).data('index');
    $(`.link-item[data-index="${index}"]`).remove();
  });
}

const handleAllocationsList = () => {
  const $allocationList = $('.allocations-list');

  if ($allocationList.length === 0) return;

  const genAllocationItemHtml = (index) => {
    return `
    <div class="card card-default allocation-item mb-4" data-index="${index}">
      <div class="card-header card-header-item">
        <span class="btn-delete-allocation btn-delete-card pull-right" data-index="${index}">
          <i class="fa fa-times-circle"></i>
        </span>
      </div>
      <div class="card-body row">
        <div class="col-md-4 col-xs-4">
          <input class="form-control" type="number" min="0" max="100" step="any" name="allocations[${index}][percent]" placeholder="%" required>
        </div>
        <div class="col-md-8 col-xs-8">
          <input class="form-control js-allocation-title" type="text" name="allocations[${index}][title]" placeholder="Title" required>
        </div>
      </div>
    </div>
  `};

  /**
   * @Function Check select/options for allocations
   */



  $('.btn-add-allocation').click(function (e) {
    e.preventDefault();

    const index = $('.allocation-item').length;

    console.log(index);
    $('.allocations-list').append(genAllocationItemHtml(index));
  });

  $(document).on('click', '.btn-delete-allocation', function (e) {
    e.preventDefault();

    const index = $(this).data('index');
    $(`.allocation-item[data-index="${index}"]`).remove();
  });
}

const handleTGEList = () => {
  const $tgeList = $('.tge-list');

  if ($tgeList.length === 0) return;

  const genTGEItemHtml = (index) => {
    return `
    <div class="card card-default tge-item mb-4" data-index="${index}">
      <div class="card-header card-header-item">
        <span class="btn-delete-tge btn-delete-card pull-right" data-index="${index}">
          <i class="fa fa-times-circle"></i>
        </span>
      </div>
      <div class="card-body row">
        <div class="col-md-6 col-xs-12">
          <input class="form-control" type="text" name="tgeSummary[${index}][title]" placeholder="Title" required>
        </div>
        <div class="col-md-3 col-xs-6">
          <input class="form-control" type="text" name="tgeSummary[${index}][value]" placeholder="Value" required>
        </div>
        <div class="col-md-3 col-xs-6">
          <select class="form-control" name="tgeSummary[${index}][valueType]">
            <option value="TEXT">text</option>
            <option value="NUMBER">number</option>
            <option value="%">%</option>
            <option value="USD">$</option>
          </select>
        </div>
      </div>
    </div>
  `};

  $('.btn-add-tge').click(function (e) {
    e.preventDefault();

    const index = $('.tge-item').length;

    console.log(index);
    $('.tge-list').append(genTGEItemHtml(index));
  });

  $(document).on('click', '.btn-delete-tge', function (e) {
    e.preventDefault();

    const index = $(this).data('index');
    $(`.tge-item[data-index="${index}"]`).remove();
  });
}

const handleScheduleStartVesting = () => {
  const $vestingSchedule = $('.vesting-schedule-start');

  if ($vestingSchedule.length === 0) return;

  $vestingMonth = $('select[name="vestingMonth"]');
  $vestingYear = $('input[name="vestingYear"]');

  if ($('input[type="checkbox"][name="monthCountingStart"]').is(':checked')) {
    $vestingMonth.prop('disabled', false);
    $vestingYear.prop('disabled', false);
  } else {
    $vestingMonth.prop('disabled', true);
    $vestingYear.prop('disabled', true);
  }

  $('input[type="checkbox"][name="monthCountingStart"]').change(function () {
    if ($(this).is(':checked')) {
      $vestingMonth.prop('disabled', false);
      $vestingYear.prop('disabled', false);
    } else {
      $vestingMonth.prop('disabled', true);
      $vestingYear.prop('disabled', true);
    }
  });

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  $vestingMonth.val(currentMonth).change();
  $vestingYear.val(currentYear);

  const genScheduleItemHtml = (index) => {
    return `
    <div class="card card-default schedule-item mb-4" data-index="${index}">
      <div class="card-header card-header-item">
        <span class="btn-delete-schedule btn-delete-card pull-right" data-index="${index}">
          <i class="fa fa-times-circle"></i>
        </span>
      </div>
      <div class="card-body row">
        <div class="col-md-6 col-xs-12 mb-3">
          <input class="form-control" type="text" name="vestingSchedule[${index}][title]" placeholder="Title" required>
        </div>
        <div class="col-md-3 col-xs-6 mb-3 input-group">
          <span class="input-group-prepend">
            <span class="input-group-text">%</span>
          </span>
          <input type="number" min="0" max="100" class="form-control" name="vestingSchedule[${index}][tgeUnlock]" placeholder="TGE unlock">
        </div>
        <div class="col-md-3 col-xs-6 mb-3 input-group">
          <span class="input-group-prepend">
            <span class="input-group-text">$</span>
          </span>
          <input type="number" min="0" step="any" class="form-control" name="vestingSchedule[${index}][tokenPrice]" placeholder="Token price">
        </div>
        <div class="col-md-6 col-xs-12">
          <input class="form-control" type="text" name="vestingSchedule[${index}][description]" placeholder="Description">
        </div>
        <div class="col-md-6 col-xs-12 input-group">
          <input type="number" min="0" step="1" class="form-control" name="vestingSchedule[${index}][cliffMonths]" placeholder="Cliff months">
          <span class="input-group-prepend">
            <span class="input-group-text">/</span>
          </span>
          <input type="number" min="0" step="1" class="form-control" name="vestingSchedule[${index}][vestingMonths]" placeholder="Vesting months">
        </div>
      </div>
    </div>
  `};

  $('.btn-add-schedule').click(function (e) {
    e.preventDefault();

    const index = $('.schedule-item').length;

    console.log(index);
    $('.schedules-list').append(genScheduleItemHtml(index));
  });

  $(document).on('click', '.btn-delete-schedule', function (e) {
    e.preventDefault();

    const index = $(this).data('index');
    $(`.schedule-item[data-index="${index}"]`).remove();
  });
}

function onTelegramSendAllChange() {
  const $sendAllElement = $('#telegram-send-all');

  if (!$sendAllElement.length) return;

  const $telegramUsersElement = $('#telegram-users');

  $sendAllElement.on('change', function () {
    $telegramUsersElement.attr('disabled', $sendAllElement[0].checked);
    $telegramUsersElement.attr('required', !$sendAllElement[0].checked);
  });
}

$(document).ready(() => {
  configColorPicker();
  configSelect2();
  configCKE();
  configDropZone();
  toggleShowDropzone();
  configDateTimePicker();
  editSlug2();
  btnConfirmLogout();
  btnReqDelete();
  validatePasswordForm();
  headerActive();
  btnSelectImage();
  onSearchImages();
  fetchImages();
  btnSaveChange();
  configMultiImages();
  validateForm();
  alertWhenEditing();
  onChangeShop();
  btnAddCategory();
  handleCategoryAccordion();
  onValidateShopForm();
  onSubmitShopForm();
  permissionCheckboxShowAll();
  handleSearchForm();
  onToggleYearlyCheckbox();
  onTypeShopChange();
  onApproveRequestItem();
  onRejectRequestItem();
  onSwitchUnlimitedRarityItem();
  onUploadFile();
  configSelectTimezone();
  handleTimelinesList();
  handleLinksList();
  handleAllocationsList();
  handleTGEList();
  handleScheduleStartVesting();
  onTelegramSendAllChange();
});
