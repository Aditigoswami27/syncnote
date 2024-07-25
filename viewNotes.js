$(document).ready(function() {
    const API_url = "http://localhost:3000";

    function fetchNotes() {
        axios.get(`${API_url}/getnotes`)
            .then(response => {
                const notes = response.data;
                const notesContainer = $('#notesContainer');
    //Selects the HTML element with the ID notesContainer using jQuery for appending notes.
                const loadingElement = $('#loading');
                
                loadingElement.hide();
                notesContainer.empty(); //Clears any previous content in the notesContainer.

                if (notes.length === 0) {
                    notesContainer.html('<p>No notes available.</p>');
                    return;
                }

                notes.forEach((note, index) => {
                    const noteItem = $('<div>').addClass('note-item');
                    
                    const titleElement = $('<div>').addClass('note-title').text(`${index + 1}. ${note.title}`);
//Creates a div element with the class note-title and sets its text to the note's title, prefixed with the note's index      
                    const urlElement = $('<div>').addClass('note-url').html(`
                    <a href="${note.url}" target="_blank"><strong>Website link</strong></a>`);
                   //Ensures the link opens in a new tab or window when clicked.
// Creates a div element with the class note-url and includes a label "Website link" with the note's URL as a clickable link.
                    
                    const contentElement = $('<div>').addClass('note-content').html(note.description);
                    
                    titleElement.on('click', function() {
                        contentElement.toggle(); //Toggles the visibility of the content element when the title is clicked.
                    });

                    noteItem.append(titleElement).append(urlElement).append(contentElement);
                    notesContainer.append(noteItem);
                });
            })
            .catch(error => {
                console.log('Error fetching notes:', error);
                $('#loading').text('Failed to load notes.');
            });
    }
    
    fetchNotes();
});
