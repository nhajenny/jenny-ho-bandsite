//sprint-3
//API key
import BandSiteApi from './band-site-api.js';
const API_KEY="1b40932c-c612-4e3a-8adf-0d72a2e6c875";
const bandSiteApi = new BandSiteApi(API_KEY);

async function getRenderComments(){
    try {
        const comments = await bandSiteApi.getComments();
        renderComment(comments);
        console.log(comments);
    } catch(error) {
        console.error("error getting comments",error);
    }
}

// const commentArray = [
//     {
//         name: "Victor Pinto",
//         date: "11/02/2023",
//         comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
//         profilePic: "../assets/images/Mohan-muruge.jpg",
//     },
//     {
//         name: "Christina Cabrera",
//         date: "10/28/2023",
//         comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
//         profilePic: "../assets/images/Mohan-muruge.jpg",
//     },
//     {
//         name: "Isaac Tadesse",
//         date: "10/20/2023",
//         comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
//         profilePic: "../assets/images/Mohan-muruge.jpg",
//     }
// ];
function renderComment(comments) {
    let defaultCommentContainer = document.querySelector(".section__comment_container--bottom");
    defaultCommentContainer.innerHTML="";
    const orderedComments = comments.sort((a,b)=> b.timestamp - a.timestamp);
    orderedComments.forEach((comment)=> {
 // for (let i=0; i<comments.length;i++){
    let allDefaultComments = document.createElement("div");
    allDefaultComments.classList.add("section__default_comment--container")
    defaultCommentContainer.appendChild(allDefaultComments);
 
    //container for the left side with avatar - need to append it to default comment container
    let commentLeftSide=document.createElement('div');
    commentLeftSide.classList.add("section__comment--left");
    allDefaultComments.appendChild(commentLeftSide);
    
    let profileContainer = document.createElement('div');
    profileContainer.classList.add("section__comment--profile");
    commentLeftSide.appendChild(profileContainer);

    let commentRightSide=document.createElement('div');
    commentRightSide.classList.add("section__comment--right");
    allDefaultComments.appendChild(commentRightSide);


    //container for name+date under alldefaultcomment card
    //need to put Top and text in one box so that profile picture can take up left side
    let commentCardTop = document.createElement('div');
    commentCardTop.classList.add("section__comment_top");
    commentRightSide.appendChild(commentCardTop);
   

    let commentName= document.createElement('div')
    commentName.classList.add("section__comment--name");
    commentName.innerText =comment.name;
    commentCardTop.appendChild(commentName);
   
    let dateContainer = document.createElement('div');
    dateContainer.classList.add("section__comment--date");
    dateContainer.innerText = new Date(comment.timestamp).toLocaleDateString('en-US',{weekday:'short',year:'numeric', month:'numeric',day:'numeric'});
    commentCardTop.appendChild(dateContainer);

    let commentContentContainer = document.createElement('p');
    commentContentContainer.classList.add("section__comment--text");
    commentContentContainer.innerText=comment.comment;
    commentRightSide.appendChild(commentContentContainer);  
     
    //container for like button & delete button
    let commentCardBottom=document.createElement('div');
    commentCardBottom.classList.add("section__comment_card-bottom")
    commentRightSide.appendChild(commentCardBottom);
    //like button and functionality
    let commentLikeCounter=document.createElement('div');
    commentLikeCounter.classList.add("section__comment_right--counter");
    commentLikeCounter.innerText = comment.likes;
    commentCardBottom.appendChild(commentLikeCounter);
    let commentLikeButton = document.createElement('img');
    commentLikeButton.src="assets/icons/SVG/icon-like.svg";
    commentLikeButton.classList.add("section__comment_right--like");
    commentLikeButton.addEventListener("click", async()=> {
        try {
            const likedComment = await bandSiteApi.likeComments(comment.id);
            getRenderComments();
            console.log(likedComment);
        } catch (error) {
            console.error("error liking comment:", error);
        }
    });
    commentCardBottom.appendChild(commentLikeButton);


    //delete button & functionality
    let commentDeleteButton = document.createElement('button');
    commentDeleteButton.classList.add("section__comment-delete")
    commentDeleteButton.innerText = "delete";
    commentDeleteButton.addEventListener("click", async()=>{
        try {
            const deletedComment = await bandSiteApi.deleteComments(comment.id);
            getRenderComments();
            console.log(deletedComment);
        } catch (error) {
            console.error("error deleting comment:", error)
        }
    })
    commentCardBottom.appendChild(commentDeleteButton);  
});   
}

getRenderComments();

//form dynamic
const commentForm = document.getElementById('commentForm');
commentForm.addEventListener('submit', async function (event){
    event.preventDefault();
    
    const nameInput = event.target.nameInput; 
    const commentInput = event.target.commentInput;
    const nameInputValue = nameInput.value.trim(); 
    const commentInputValue = commentInput.value.trim();
    let formValid=true;

    if (nameInputValue === '') {
        nameInput.classList.add("comment__input_state--error");
        formValid=false;
    } else {nameInput.classList.remove('comment__input_state--error');
    }
    if (commentInputValue === '') {
        commentInput.classList.add("comment__input_state--error");
        formValid=false;
    } else {commentInput.classList.remove('comment__input_state--error');
    }

    if (!formValid) {
        alert("Please fill out information");
        return;
    }
    const newComment = {
        name: nameInputValue,
        comment: commentInputValue,
         // commentArray.unshift({
        //     name: nameInputValue,
        //     date: new Date().toLocaleDateString(),
        //     comment: commentInputValue,
        //     profilePic: "../assets/images/Mohan-muruge.jpg",
    };
    try {
        const postedComments = await bandSiteApi.postComments(newComment);
        console.log('posted comments:',postedComments);
        getRenderComments();
        commentForm.reset();
    } catch (error) {
        console.error("Error posting comments:", error);
    }
  }); 

 
        



