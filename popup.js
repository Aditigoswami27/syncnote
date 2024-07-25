$(document).ready(function() {
    const API_url = "http://localhost:3000";
    console.log('Popup script loaded');

    function checkUrlExists(url, callback) {
        console.log('Checking if URL exists:', url);
        axios.post(`${API_url}/checkurl`, { url: url })
            .then(response => {
                console.log('URL exists response:', response.data);
                callback(response.data.exists, response.data.note);
            })
            .catch(error => {
                console.error('Error checking URL:', error);
                callback(false, null);
            });
    }

    function saveNote() {
        const title = $('#title').val();
        const notes = $('#notes').val();
        console.log('Saving note:', { title, notes });
        if (title) {
            chrome.runtime.sendMessage({ todo: "getCurrentUrl" }, function(response) {
                if (response.url) {
                    console.log('Current URL:', response.url);
                    axios.post(`${API_url}/savenote`, {
                        url: response.url,
                        title: title,
                        notes: notes
                    })
                    .then(response => {
                        console.log('Note saved successfully:', response.data);
                        chrome.notifications.create('saveNotification', {
                            type: 'basic',
                            iconUrl: 'icon-128.png',
                            title: 'Note Saved Successfully!',
                            message: 'Your note has been saved.'
                        }, function(notificationId) {
                            if (chrome.runtime.lastError) {
                                console.error('Notification error:', chrome.runtime.lastError);
                            } else {
                                console.log('Notification created with ID:', notificationId);
                            }
                        });
                        window.close(); // Close the popup after operation
                    })
                    .catch(error => {
                        console.error('Error saving note:', error);
                    });
                } else {
                    console.error('Could not get the current tab URL');
                }
            });
        } else {
            console.error('Title is required');
        }
    }

    function editNote() {
        const title = $('#title').val();
        const notes = $('#notes').val();
        console.log('Editing note:', { title, notes });
        chrome.runtime.sendMessage({ todo: "getCurrentUrl" }, function(response) {
            if (response.url) {
                console.log('Current URL:', response.url);
                axios.post(`${API_url}/editnote`, {
                    url: response.url,
                    title: title,
                    notes: notes
                })
                .then(response => {
                    console.log('Note edited successfully:', response.data);
                    chrome.notifications.create('editNotification', {
                        type: 'basic',
                        iconUrl: 'icon-128.png',
                        title: 'Note Edited Successfully!',
                        message: 'Your note has been edited.'
                    }, function(notificationId) {
                        if (chrome.runtime.lastError) {
                            console.error('Notification error:', chrome.runtime.lastError);
                        } else {
                            console.log('Notification created with ID:', notificationId);
                        }
                    });
                    window.close(); // Close the popup after operation
                })
                .catch(error => {
                    console.error('Error editing note:', error);
                });
            } else {
                console.error('Could not get the current tab URL');
            }
        });
    }

    function removeNote() {
        chrome.runtime.sendMessage({ todo: "getCurrentUrl" }, function(response) {
            if (response.url) {
                console.log('Current URL:', response.url);
                axios.post(`${API_url}/removenote`, { url: response.url })
                    .then(response => {
                        console.log('Note removed successfully:', response.data);
                        chrome.notifications.create('removeNotification', {
                            type: 'basic',
                            iconUrl: 'icon-128.png',
                            title: 'Note Removed Successfully!',
                            message: 'Your note has been removed.'
                        }, function(notificationId) {
                            if (chrome.runtime.lastError) {
                                console.error('Notification error:', chrome.runtime.lastError);
                            } else {
                                console.log('Notification created with ID:', notificationId);
                            }
                        });
                        window.close(); // Close the popup after operation
                    })
                    .catch(error => {
                        console.error('Error removing note:', error);
                    });
            } else {
                console.error('Could not get the current tab URL');
            }
        });
    }

    // Check if URL exists when popup is loaded
    chrome.runtime.sendMessage({ todo: "getCurrentUrl" }, function(response) {
        if (response.url) {
            checkUrlExists(response.url, function(exists, note) {
                if (exists) {
                    $('#editButton').show();
                    $('#removeButton').show();
                    // Prefill the title and notes fields with the existing data
                    $('#title').val(note.title);
                    $('#notes').val(note.description);
                } else {
                    $('#saveButton').show();
                    $('#removeButton').show();
                }
            });
        } else {
            console.error('Could not get the current tab URL');
        }
    });

    $('#saveButton').click(saveNote);
    $('#editButton').click(editNote);
    $('#removeButton').click(removeNote);
});
