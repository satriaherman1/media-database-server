const start_btn = document.querySelector('.start_btn button')
const exit_btn = document.querySelector('.quit')
const continue_btn = document.querySelector('.restart')
const info_box = document.querySelector('.info_box')
const quiz_box = document.querySelector('.quiz_box')
const timeCount = document.querySelector(".timer_left")
const time_line = document.querySelector(".time_line");
const header = document.querySelector("header");
const result_box = document.querySelector(".result_box");
const score_text = document.querySelector(".score");


// if start btn clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo")
}


continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
  
    showQuestions(que_count)
    queCounter(1);
    startTimer();
    startTimeLine();
}

let que_count = 0;
let que_num = 1;
let counter;
let score = 0;
let timeValue = 15;
let time_line_width = 0;

const next_btn = quiz_box.querySelector('.next_btn');

// next btn clicked
next_btn.onclick = () => {
    next_btn.style.display = "none"
    if(que_count < question.length -1){
        que_count++;
        que_num++;
        showQuestions(que_count);
        queCounter(que_num);
        clearInterval(counter);
        clearInterval(time_line_counter);
        startTimer(timeValue);
        startTimeLine(0);
        timeValue = 15;
        time_line_width = 0;
    }
    else{
        score_text.textContent = score;
        showResult();
    }
}

// getting question and option from array
function showQuestions(index){
    const option_list = document.querySelector(".option_list");
    const que_text = document.querySelector(".que_text");
    let que_tag = `<span>`+ question[index].num + ". " + question[index].question +`</span>`;
    let option_tag = `<div class="option">
    <span>${question[index].options[0]}</span>
    </div>
    `+
    `<div class="option">
    <span>${question[index].options[1]}</span>
    </div>
    `+
    `<div class="option">
    <span>${question[index].options[2]}</span>
    </div>
    `+
    `<div class="option">
    <span>${question[index].options[3]}</span>
    </div>
    `
    
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    
    const option = option_list.querySelectorAll('.option');
    for (let i= 0; i < option.length; i++) {
        option[i].setAttribute("onclick" , "optionSelected(this)");
    }
}

const option_list = document.querySelector(".option_list");
function optionSelected(answer){
    let userAns = answer.querySelector('span').textContent;
    let correctAns = question[que_count].answer;
    const allOptions = option_list.children.length;
    clearInterval(time_line_counter)
    timeValue = 0;
    time_line_width = 0;
    time_line.style.width = "100%"

    
    
    if(userAns == correctAns){
        answer.classList.add("correct");
        score += 20;
    }
    else{
        answer.classList.add("incorrect")
        // jika jawaban salah maka munculkan jawaban benarnya
        for (let i = 0; i < allOptions; i++) {
            if(option_list.children[i].querySelector('span').textContent == correctAns){
                option_list.children[i].setAttribute('class', 'option correct')
            }

        }
    }

    // disable click ketika user sudah menjawab
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled")
    }

    next_btn.style.display = "block";

}

function startTimer(){
    counter = setInterval(timer, 1000);

    function timer(){
        timeCount.textContent = timeValue;
        timeValue--;
        if(timeValue < 0){
            clearInterval(counter)
        }
    }
}

function startTimeLine(){
    time_line_counter = setInterval(timeLine, 100);
    const allOptions = option_list.children.length;
    let correctAns = question[que_count].answer;
    function timeLine(){
        time_line_width += 2.1;
        time_line.style.width = time_line_width + "px";
        if(time_line.offsetWidth > header.offsetWidth){
            clearInterval(time_line_counter);

            for (let i = 0; i < allOptions; i++) {
            if(option_list.children[i].querySelector('span').textContent == correctAns){
                option_list.children[i].setAttribute('class', 'option correct')
            }
            next_btn.style.display = "block"
        }
        }
    }
}

function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = ` <span><p>${index}</p>of <p>`+question.length+`</p> Question </span>`;
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}


// show result
function showResult(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
}