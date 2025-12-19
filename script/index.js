// Create HTML elements from array (returns string) //
const createElement = (arr) => {
    const htmlelements = arr.map((el) => `<span class="btn">${el}</span>`);
    return htmlelements.join(" ");
};

// Speech Synthesis function //
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

// Spinner manage function //
const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    } else {
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
};

// Create synonym buttons HTML (returns string)
const createSynonymButtons = (syns) => {
    if (!syns || syns.length === 0) return '<span class="text-sm text-gray-500">No synonyms found.</span>';
    // map to small buttons for display
    return syns.map(s => `<button type="button" class="btn btn-sm btn-outline mr-2 mb-2">${s}</button>`).join('');
};
// Nicher function gula lesson gula ante use kra hoise //
const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // Promise of response
    .then((res) => res.json()) // Promise of JSON data
    .then((json) => displayLesson(json.data)); // calling displayLessons with the data
};

// Nicher funcion gula kono lesson er word gula ante use kra hoise //
const loadLevelWord = (id) => {
    manageSpinner(true);
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

// Nicher function gula kono word er detail ante use kra hoise //
const loadWordDetail = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
};

// Nicher function gula kono word er detail dekhate use kra hoise //
const displayWordDetails = (word) => {
    console.log(word);
    const detailsBox = document.getElementById("details-container");
        detailsBox.innerHTML=` <div class="">
        <h2 class="text-2xl font-bold">
          ${word.word} (<i class="fa-solid fa-microphone-lines"></i> ${word.pronunciation})
        </h2>
      </div>
      <div class="">
        <h2 class="font-bold">Meaning</h2>
        <p>${word.meaning}</p>
        <h2 class="font-bold">Example</h2>
        <p>${word.sentence}</p>
        </div>
        <div class="">
        <h2 class="font-bold">Synonym</h2>
                <div class="">${createSynonymButtons(word.synonyms)}
        </div>
        </div>
                <div class="mt-4 text-right">
                    <button type="button" id="details-close" class="btn text-white bg-[#ff3030] hover:bg-[#d20000]">Close</button>
                </div>
        `;
    document.getElementById("word_modal").showModal();
        // wire close button
        const closeBtn = document.getElementById('details-close');
        if (closeBtn) closeBtn.addEventListener('click', () => document.getElementById('word_modal').close());
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
        manageSpinner(false);
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
            <button type="button" onClick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50] p-3 touch-manipulation"><i class="fa-solid fa-circle-info"></i></button>
            <button type="button" onClick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50] p-3 touch-manipulation"><i class="fa-solid fa-volume-high"></i></button>
        </div>
  </div>  
        `;
        wordContainer.append(card);
    })
    manageSpinner(false);
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
            <button type="button" id="lesson-btn-${lesson.level_no}" 
            onClick="loadLevelWord(${lesson.level_no})" 
            class="btn btn-outline btn-primary lesson-btn w-full sm:w-auto py-3 sm:py-2">
            <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
            </button>
        `;

    // 4. append into the container //
        levelContainer.append(btnDiv);
        }
};

// call loadLessons to display lessons on page load //
loadLessons();
document.getElementById("btn-search").addEventListener("click", function(){
    removeActive();
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);
    fetch("https://openapi.programming-hero.com/api/words/all")
    .then(res => res.json())
    .then(data => {
        const allWords = data.data;
        const filteredWords = allWords.filter(word => word.word.toLowerCase().includes(searchValue));
        displayLevelWord(filteredWords);
    });
});