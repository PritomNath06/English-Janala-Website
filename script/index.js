
// Nicher function gula lesson gula ante use kra hoise //
const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // Promise of response
    .then((res) => res.json()) // Promise of JSON data
    .then((json) => displayLesson(json.data)); // calling displayLessons with the data
};


// Nicher funcion gula kono lesson er word gula ante use kra hoise //
const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeActive(); // active class remove krar jonno
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add("active"); // add active class
        displayLevelWord(data.data)
        
    });
};


// Nicher function gula active button er class remove krte use kra hoise //
const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach(btn=> btn.classList.remove("active"));
};



// Nicher function gula kono lesson er word gula dekhate use kra hoise //
const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if(words.length === 0){
        wordContainer.innerHTML = `
        <div class="text-center col-span-full rounded py-10 space-y-6">
  <p class="text-xl font-medium text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
  <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
</div> `;
        return;
    }
        


// Nicher code gula word gula ke card akare dekhate use kra hoise //
    words.forEach((word) => {
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
    <h2 class="font-bold text-2xl">${word.word ? word.word :"(Word Not Found)"}</h2>
    <p class="font-semibold">${word.meaning ? word.meaning : "(Meaning Not Found)"}</p>
    <div class="text-2xl font-medium font-bangla">${word.pronunciation ? word.pronunciation : "(Pronounciation Not Found)"}</div>
    <div class="flex justify-between items-center">
      <button onClick="my_modal_5.showModal()" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-circle-info"></i></button>
      <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-volume-high"></i></button>
    </div>
  </div>  
        `;
        wordContainer.append(card);
    })
        
}


// Nicher function gula lesson gula ke button akare dekhate use kra hoise //
const displayLesson = (lessons) => {
    // 1. get the container & empty it //
        const levelContainer = document.getElementById("level-container");
        levelContainer.innerHTML = "";

    // 2. get into every lesson & create a div //
        for (let lesson of lessons){
    
            // 3. create element //

        const btnDiv = document.createElement("div");
        btnDiv.innerHTML=`
            <button id="lesson-btn-${lesson.level_no}" 
            onClick="loadLevelWord(${lesson.level_no})" 
            class="btn btn-outline btn-primary lesson-btn">
            <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
            </button>
        `;

    // 4. append into the container //
        levelContainer.append(btnDiv);
        }
};
loadLessons();