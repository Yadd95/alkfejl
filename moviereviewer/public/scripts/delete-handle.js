'use strict'

function btnMovieDelete_click(e) {

  e.preventDefault()
  const $a = $(this)
  const $modal = $('.confirm-modal')
  const $ok = $modal.find('.modal-ok')
  $modal.modal('show')

  // perform delete on OK
  $ok.off('click')
  $ok.on('click', function(e) {
    _ajaxOp($a, 'DELETE', resp => {
      if ($a.data('redirect')) {
        location.assign($a.data('redirect'))
      }
    })
  })
}

function btnReviewDelete_click(e) {
  e.preventDefault()
  const $a = $(this)
  const $modal = $('.confirm-modal')
  const $ok = $modal.find('.modal-ok')
  $modal.modal('show')

  // perform delete on OK
  $ok.off('click')
  $ok.on('click', function(e) {
    _ajaxOp($a, 'DELETE', resp => {
      if ($a.data('redirect')) {
        location.assign($a.data('redirect'))
      }
    })
  })
}

function _ajaxOp($a, method, success) {
  const headers = {
    'csrf-token': $('[name="_csrf"]').val()
  }
  $.ajax({
    url: '/ajax' + $a.attr('href'),
    method,
    headers,
    error: e => alert('Unsuccesful'),
    success,
  })
}