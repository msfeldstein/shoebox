/*global gapi */
const $script = require('scriptjs')

$script('https://apis.google.com/js/api.js', function() {
  console.log( "GAPI?", gapi)
  const CLIENT_ID = '797764752013-0nm6ktg4k6qt0le829k07kij3nvnco8t.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyAYmhtzJWbOvN3mI1EKwPk-AspIOQ2cO7w';
  const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
  const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';
  gapi.load('client:auth2', initClient);
  
  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  function initClient() {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(function () {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      console.log("Signed in")
    }, function(error) {
      console.error(error)
    });
  }

  function updateSigninStatus(isSignedIn) {
    console.log("Is signed in ", isSignedIn)
  }
})

export async function signIn() {
  gapi.auth2.getAuthInstance().signIn();
}

export async function signOut() {
  gapi.auth2.getAuthInstance().signOut();
}

export async function searchFolders(query) {
  const params = [
    ["name", "contains", `'${query}'`],
    ["mimeType", "=", "'application/vnd.google-apps.folder'"],
    ["trashed", "=", "false"],
    ["'me'", "in", "owners"]
  ].map(set => set.join(' ')).join(" and ")

  const response = await gapi.client.drive.files.list({
    'pageSize': 30,
    'q': params,
    'fields': "nextPageToken, files(id, name, kind, mimeType)",
    'spaces': 'drive',
  })
  return response.result.files
}




