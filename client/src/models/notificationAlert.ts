export class NotificationMessage {
  title = '';
  content = '';
  type = '';
  alert = {
    title: {
      error: 'Upload failed!',
      success: 'Upload success',
    },
    content: {
      error: 'Check data again!',
      success: 'Data uploaded',
    },
    class: {
      success: 'success',
      danger: 'danger',
    },
  };
}
