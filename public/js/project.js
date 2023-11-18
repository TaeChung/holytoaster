document.addEventListener("DOMContentLoaded", () => {
  const commentButton = document.getElementById('submit');
  const submitComment = async (event) => {
    event.preventDefault();
    try {
      const commentBoxValue = document.getElementById('commentBox').value; 
      
      if (commentBoxValue) {
        const response = await fetch("/api/comments", {
          method: 'POST',
          body: JSON.stringify({ description: commentBoxValue }), 
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          class Comment {
            constructor(msg) {
              this.element = document.createElement('div');
              this.element.innerHTML = `${msg}`; 
            }
          }
          
          const commentsSection = document.getElementById('commentsSection');
          const newComment = new Comment(JSON.stringify(commentBoxValue));
          commentsSection.appendChild(newComment.element); 
        } else {
          alert('Failed to create comment');
        }
      }
    }
    catch(error) {
      console.error('Error creating comment:', error);
    }
  }
  commentButton.addEventListener("click", submitComment);
});