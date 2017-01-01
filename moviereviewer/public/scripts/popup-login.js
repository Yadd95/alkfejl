
'use strict'

/* megjeleníti a modal-t loginhoz */
$('#btn-login').on('click', function(e) {
  e.preventDefault()
  const $modal = $('#login-modal')
  const $formContainer = $modal.find('.form-area')
  const $errorContainer = $modal.find('.alert-danger').hide()

  if ($formContainer.find('form').length == 0) {
    $formContainer.load('/login form', function() {
      $modal.find('form').on('submit', function(e) {
        e.preventDefault()

        $.ajax({
          url: '/ajax/login',
          method: 'POST',
          data: $(this).serializeArray(),
          headers: { 'csrf-token': $('[name="_csrf"]').val() },

          success: () => {
            const $prLoad = new Promise((resolve, reject) => {
              $('#navbar').load('/ #navbar', resolve)
            })
            Promise.resolve( $prLoad).then(() => {
              $modal.modal('hide')
            })
          },

          error: () => {
            $errorContainer.show()
          }
        }) 
      }) 
    }) 
  } 

  $modal.modal('show')
})