import 'whatwg-fetch';

// Actions for Redux
export const getTitle = () => ({
  type: 'TITLE',
  payload: fetch('/hello.json')
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    return json.title;
  })
});
